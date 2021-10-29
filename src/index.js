import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { GlobalStyles } from "./global-styles"
import { FirebaseContext } from "./context/firebase"

// HYDRATING THE FIRESTORE
// import { seedDatabase } from "./seed"
// -------------------------------------

const config = {
    apiKey: "AIzaSyBuHCDoDnIjK2nZ049kv8TPnYgk6hUioh4",
    authDomain: "netflix-clone-41ccd.firebaseapp.com",
    projectId: "netflix-clone-41ccd",
    storageBucket: "netflix-clone-41ccd.appspot.com",
    messagingSenderId: "521215605197",
    appId: "1:521215605197:web:37c0fb7f95a10589486c84"
}

// STORE API KEYS AS ENV VARS IN FIREBASE FUNCTIONS
// const functions = require('firebase-functions')
// const config = functions.config().netflix_clone
// ------------------------------------------------

const firebase = window.firebase.initializeApp(config)

// HYDRATING THE FIRESTORE
// seedDatabase(firebase)
// -----------------------

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
