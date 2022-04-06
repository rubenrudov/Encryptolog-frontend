import React from 'react';
import Header from './Header';

/**
* @author Ruben Rudov
* @function Layout
**/

// The model of the layout is the header and the page
const Layout = (props) => {
  return(
    <div>
        <Header />
        {props.children}
    </div>
  )
}

export default Layout