import React, { useRef, useState } from "react";
import Layout from "./layouts/Layout";
import { Card, Button } from '@mui/material'
import { Form } from 'react-bootstrap'
import { useAuth } from "../helpers/AuthContext";
import { useHistory } from "react-router-dom";
import { MuiStyles } from "../styles/MuiStyles";

export default function Login() {

    // Set input refs
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth() // Login hook
    const [error, setError] = useState("") 
    const [loading, setLoading] = useState(false)
    const history = useHistory(); // History hook

    // Login function
    async function handleSubmit(e) {
        e.preventDefault()

        try 
        {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        }
        catch 
        {
            setError("Failed to log in")
        }
        
        setLoading(false)
    }

    // Return login form that contains email and password fields + submit button
    return (
        <Layout>
            <div>
                <Card style={{ padding: 20 }}>
                    <Form className="form" onSubmit={handleSubmit}>
                       
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