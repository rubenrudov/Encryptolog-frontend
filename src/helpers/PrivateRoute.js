/**
 * @Purpose Restriction of private routes of the application
 */

// Imports
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./AuthContext"

// Return a route that renders only if there is a logged in user that tries to get this route
export default function PrivateRoute({ component: Component, ...rest }) {
    
    // Current user instance via auth custom hook
    const { currentUser } = useAuth()

    // Function for restricting private routes of the website
    return (
        <Route
            {...rest}
            render={
                props => {
                    // If current user connection exist - return requested component with it's props, else redirect to login
                    return (
                        currentUser 
                        ? 
                        <Component {...props} /> 
                        : 
                        <Redirect to="/login" />
                    )
                }
            }
        />
    )
}