/**
 * @author Ruben Rudov
 * @purpose Handling all authentication stuff of the website
 */

import { useContext, useState, useEffect, createContext } from "react"
import { auth, database } from "../configs/fireb"

// Create auth context by using the structural hook - createContext()
const AuthContext = createContext()

// Custom hook for getting the auth context by using the useContext() hook 
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    // Set states
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // Return the result of signup + save user to db if successful signup
    function signup(email, password, fullname) {
        return auth.createUserWithEmailAndPassword(email, password).then(console.log(database.ref().child('/users').push(
            {
                fullname: fullname,
                email: email,
                password: password
            }
        )))
    }

    // Login with email and password
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    // Logout
    function logout() {
        return auth.signOut()
    }

    // Subscribe into 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    // Possible values to useAuth
    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    // Return authprovider
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}