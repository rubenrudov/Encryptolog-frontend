import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// FIXME: Improve the state management by using redux
// import { Provider } from 'react-redux'
// import store from './state_management/store';

// window.store = store

// Document Object Model rendering of the application
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);