import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { GlobalStyles } from "./global-styles"
import { FirebaseContext } from "./context/firebase"
import firebaseConfig from "./utils/config"

const firebase = window.firebase.initializeApp(firebaseConfig)

// -------------------------------------
// HYDRATING THE FIRESTORE
// * Uncomment & run to hydrate * 
// import { seedDatabase } from "./seed"
// seedDatabase(firebase)
// -------------------------------------

ReactDOM.render(
    <>
    {/* Context Provider for Firebase */}
        <FirebaseContext.Provider 
            value={{ firebase: window.firebase }}
        >
            {/* styledComponent: GlobalStyles component 
            for html & body elements */}
            <GlobalStyles />
            
            {/* Component: App */}
            <App />
        </FirebaseContext.Provider>
    </>, 
    document.getElementById('root'));
