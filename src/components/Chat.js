import React, { useEffect, useState } from "react";
import { MuiStyles } from "../styles/MuiStyles";
import { TextField, Button, Typography, AppBar, Card } from "@mui/material";
import { database } from "../configs/fireb"
import Firebase from 'firebase'
import axios from "axios";
// import DisplayDecodedMessage from "./DisplayDecodedMessage";

// Chat component, contains: chat label, chat messages list and an input section
export default function Chat({ from, to }) {

    // Encryption/Decryption API URL from config file
    const url = require('../configs/api_config.json').api_url

    // Messages array
    const [ messages, setMessages ] = useState([])

    // Function for dynamically adding messages through promises
    const addMessage = (msg) => {
        // Set list for prev values and new value
        setMessages((messages) => [...messages, {...msg}])
    }

    // Message content + input handler
    const [ content, setContent ] = useState("")
    const handleMsgInput = (e) => {
        // Name and Value assigned by component's name and value
        const { name, value } = e.target

        // If the text field is messageContent, set value to prev val + new val 
        if (name === 'messageContent') {
            setContent(value)
        }
    }

    // Function for sending the encrypred message
    async function sendMessage() {
        // Begins by passing the content to the 3rd party API that encodes the message and sends a response with flag and encoded message 
        await axios.post(url + "encode", { 
            content: content
        })
        .then((response) => {
            // Then, creates a payload and adds it into the D.B 

            var payload = {
                content: response.data.content,
                flag:  response.data.flag,
                from: from.ref,
                to: to.ref,
                timestamp: Firebase.database.ServerValue.TIMESTAMP
            }

            // Push payload to db, later, exit the chat and refresh window by the reload command
            database.ref().child('/messages').push(payload).then(() => {
                setContent("")
                window.location.reload(true)
            })
        })
    }

    // Async function for retrieving messages onChange of the params: [from, to]
    useEffect(() => {
        const messagesRef = database.ref().child('/messages/').orderByChild('timestamp')
        
        // Set messages each time a new message recieved
        messagesRef.on('value', snapshot => {
            setMessages([])
            // For each message in the db snapshot
            snapshot.forEach(snap => {
                var value = snap.val()

                console.log( from.ref === value.from && to.ref === value.to )
                console.log( from.ref === value.to && to.ref === value.from )

                // Check if the active chat users are the sender and reciever of the message
                if (
                    (from.ref === value.from && to.ref === value.to 
                    ||
                    from.ref === value.to && to.ref === value.from)        
                ) {
                    // If the do, decode the message through the API, and add the decoded message to the messages list
                    axios.post(url + 'decode', {
                        content: value.content,
                        flag: value.flag
                    }).then((response) => {
                        var msg = {
                            from: value.from,
                            to: value.to,
                            content: response.data.content,
                            timestamp: value.timestamp
                        }

                        if (!messages.find(obj => obj.timestamp === msg.timestamp)) {
                            addMessage(msg)
                        }
                    })
                }
            })
        })
    }, [from, to])

    // Return chat component -> { chatting with label, messages list, input section }
    return (
        <div style={{ width: '100%' }} >
            <div className="header">
                <Typography style={{ padding: 20 }} variant="h6">{to.data.fullname}</Typography> 
            </div>
            <hr/>
            <div className="messages" style={{ padding: 10, maxHeight: '600px', overflow: 'scroll' }}>
            {
                messages.map((element) => {
                    
                    var sender = from.ref === element.from 
                    var bgcolor = sender ? 'green' : 'white'
                    var fcolor = sender ? 'white' : 'grey'

                    return (
                        <Card style={{ padding: 10, margin: 10, backgroundColor: bgcolor, color: fcolor, border: '1px solid black' }}>
                            <Typography variant="h6">
                                <u>
                                {
                                    sender 
                                    ? 
                                    "You" 
                                    : 
                                    to.data.fullname
                                }
                                </u>
                                : {
                                    element.content
                                }
                            </Typography>
                        </Card>
                    )    
                })
            }
            </div>

            <div className="inputs" style={MuiStyles.InputsSection}>
                <center>
                    <TextField style={{ width: '85%', height: '60px', borderRadius: '0px !important' }} label="Message" value={content} name="messageContent" onChange={handleMsgInput}/>
                    <Button disabled={!content} style={{ width: '5%', height: '55px', borderRadius: '0 5px 5px 0', fontWeight: '600', cursor: 'pointer' }} variant="contained" color='success' onClick={sendMessage}>Send</Button>
                </center>
            </div>
        </div>
    )
}