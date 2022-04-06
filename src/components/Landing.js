import React, { useEffect, useState } from "react";
import { useAuth } from "../helpers/AuthContext";
import Layout from "./layouts/Layout";
import { database } from "../configs/fireb";
import { Card, Button, Typography } from "@mui/material";
import { MuiStyles } from "../styles/MuiStyles";
import Chat from "./Chat";

// Landing page component
export default function Landing() {
    
    // Set states by auth 
    const { currentUser } = useAuth()
    const [ user, setUser ] = useState({data: {email: currentUser.email}})
    const [ chats, setChats ] = useState([])
   
    // Add chat function
    const addChat = (chat) => {
        // Set list for prev values and new value
        setChats((chats) => [...chats, {...chat}])
    }

    // Active chat state
    const [ currentChat, setCurrent ] = useState(null)

    // Get users information
    function getUserInfo(email) {
        const usersRef = database.ref().child('/users')
        
        usersRef.on('value', (snapshot) => {
            var users = snapshot.val();

            for (var user in users) {

                console.log(users[user].email)

                // If user is the auth.ed user, set current user's
                if (users[user].email === email) {
                    setUser({
                        ref: user,
                        data: {
                            fullname: users[user].fullname,
                            email: email,
                            password: users[user].password,
                        }
                    })
                }
                
                // Else: add user's info to possible chats list
                else {
                    addChat({
                        ref: user,
                        data: users[user]
                    })
                }
            }
        })

    }

    // Async func for getting chats list and current user's info onRefresh of the component/switching auth.ed user
    useEffect(() => {
        if (user.ref === "" || chats.length === 0) {
            getUserInfo(currentUser.email)
        }
    }, [user])
    

    // Return the home page component -> { Current user label + Chats list, The ascitve chat component }
    return (
        <Layout>
            <Card style={MuiStyles.ChatPageCard}>
                <div className="chats" style={MuiStyles.LeftSection}>
                    <Card style={{ padding: 20 }}>
                        <Typography variant="h6"><u>Current user:</u> { user.data.fullname }</Typography>
                    </Card>
                    
                    <hr></hr>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    {
                        chats.map(chat => {
                            console.log(chat)
                            return (
                                <Button style={MuiStyles.ChatNameButton} onClick={() => {setCurrent(chat)}}><Typography>{chat.data.fullname}</Typography></Button>
                            )
                        })
                    }
                    </div>
                </div>

                <div style={{ border: '1px solid' }}>

                </div>
                <div className="chat-room" style={MuiStyles.Chat}>
                    {
                        currentChat === null
                        ?
                        <Typography style={{ padding: 20 }} variant="h6">Hello, begin chatting</Typography>
                        :
                        <Chat from={user} to={currentChat} />
                    }
                </div>
            </Card>
        </Layout>
    )
}