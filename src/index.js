import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { GlobalStyles } from "./global-styles"
import { FirebaseContext } from "./context/firebase"

const config = {
    apiKey: "AIzaSyBuHCDoDnIjK2nZ049kv8TPnYgk6hUioh4",
    authDomain: "netflix-clone-41ccd.firebaseapp.com",
    projectId: "netflix-clone-41ccd",
    storageBucket: "netflix-clone-41ccd.appspot.com",
    messagingSenderId: "521215605197",
    appId: "1:521215605197:web:37c0fb7f95a10589486c84"
}

const firebase = window.firebase.initializeApp(config)

ReactDOM.render(
    <>
        <FirebaseContext.Provider 
            value={{ firebase: window.firebase }}
        >
            <GlobalStyles />
            <App />
        </FirebaseContext.Provider>
    </>, 
    document.getElementById('root'));
