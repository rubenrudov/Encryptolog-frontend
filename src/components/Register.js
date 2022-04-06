import React, { useRef, useState } from "react";
import Layout from "./layouts/Layout";
import { Card, Button } from '@mui/material'
import { Form } from 'react-bootstrap'
import { useAuth } from "../helpers/AuthContext";
import { useHistory } from "react-router-dom";
import { MuiStyles } from "../styles/MuiStyles";
import database from "../configs/fireb";
import { push, child, ref } from "firebase/database"

// Regiteration component
export default function Register() {

    // Set input refs and other states
    const fullnameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [loading, setLoading] = useState(false)
    const { signup } = useAuth() // Auth hook
    const [error, setError] = useState("")
    const history = useHistory() // History hook
    
    // Signup function
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, fullnameRef.current.value)

            // Move user to homepage
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }

        // Set loading of registration as false
        setLoading(false)
    }

    // Return the registration form that contains 3 text fields and a submit button
    return (
        <Layout>
            <div>
                <Card style={{ ...MuiStyles.Card, padding: 20 }}>
                    <Form className="form" onSubmit={handleSubmit}>

                        <Form.Group id="fullname">
                            <Form.Label className="label">Fullname</Form.Label>
                            <br/>
                            <Form.Control className="input" type="fullname" ref={fullnameRef} required />
                        </Form.Group>
                       
                        <Form.Group id="email">
                            <Form.Label className="label">Email</Form.Label>
                            <br/>
                            <Form.Control className="input" type="email" ref={emailRef} required />
                        </Form.Group>
                        
                        <Form.Group id="password">
                            <Form.Label className="label">Password</Form.Label>
                            <br/>
                            <Form.Control className="input" type={"password"}  ref={passwordRef} required />
                        </Form.Group>

                        <Button disabled={loading} type="submit"
                            style={MuiStyles.SubmitButton}
                        >
                            Register
                        </Button>
                    </Form>
                </Card>
            </div>
        </Layout>
    )
}