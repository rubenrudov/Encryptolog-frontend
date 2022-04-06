/**
 * @author Ruben Rudov
 * @Purpose React app component - single page app routing
 */

import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./helpers/PrivateRoute";
import axios from "axios";
import { AuthProvider } from "./helpers/AuthContext";

// App component that contains all the pages (Single page webapp)
export default function App() {

    // Return the single page app with it's routes and components
    return (
        <div>
            <Router>
                <AuthProvider>
                    <Switch>
                        {/** Base routes of the system, landing register and login pages */}
                        <PrivateRoute exact path="/" component={Landing}/>
                        <Route path="/login"><Login/></Route>
                        <Route path="/register"><Register/></Route>
                        
                        {/** Inside routes: Chats app */}
                        <PrivateRoute path="/chats/:userId"></PrivateRoute>
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    )
}