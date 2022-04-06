import React, { useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../helpers/AuthContext';
import MuiAppBar from '@mui/material/AppBar';
import { MuiStyles } from '../../styles/MuiStyles'
// import { logout } from '../../actions';

/**
* @author Ruben Rudov
* @function Header: App bar that contains the logo and the menu menu
**/
const Header = (props) => {

    // States
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory();

    // Function for hadnling logging out
    async function handleLogout() {
      setError("");
      try {
        await logout()
        history.push("/login")
      } catch {
        setError("Failed to log out")
      }
    }

    // Component design: App bar -> {logo + menu items by session state}
    return(
          <MuiAppBar position='sticky' style={{...MuiStyles.AppBar, listStyleType: 'none' }}>
          
          <div className='logo'><img style={{...MuiStyles.MenuItem, height: 55, width: 65}} src={require('../../assets/logo.png')}/></div>
      
          <ul className='menu' style={{ listStyleType: 'none', flexDirection: 'row', display: 'flex', height: '100%' }}>
              {
                  currentUser
                  ?
                  <li style={{ height: '100%' }}>
                      <Button style={MuiStyles.MenuButton} onClick={handleLogout}>Logout</Button>
                  </li>
                  : 
                  <div style={{ listStyleType: 'none', flexDirection: 'row', display: 'flex', height: '100%' }}>
                    <li style={MuiStyles.MenuItem}><NavLink style={{...MuiStyles.MenuButton, fontSize: 'xx-large', paddingRight: 10, paddingLeft: 10 }} to='/register'>Register</NavLink></li>
                    <li style={MuiStyles.MenuItem}><NavLink style={{...MuiStyles.MenuButton, fontSize: 'xx-large', paddingRight: 10, paddingLeft: 10 }} to='/login'>Login</NavLink></li>
                  </div>
              }
          </ul>
      </MuiAppBar>
    )
}

export default Header