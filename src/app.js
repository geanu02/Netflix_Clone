import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes'
import { Home, SignIn, SignUp, Browse } from "./pages"
import { useAuthListener } from './hooks';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';

export function App() {
    const { user } = useAuthListener()
    // console.log("User Console: " + JSON.stringify(user))

    return (
        <Router>
            <Switch>
                {/* <Route exact path="/mock">
                    <Browse />
                </Route> */}
                <IsUserRedirect
                    exact
                    path={ROUTES.MOCK}
                    loggedInPath={ROUTES.BROWSE}
                >
                    <Browse />
                </IsUserRedirect>
                <IsUserRedirect
                    user={user}
                    loggedInPath={ROUTES.BROWSE}
                    path={ROUTES.SIGN_IN}
                >
                    <SignIn />
                </IsUserRedirect>
                <IsUserRedirect 
                    user={user}
                    loggedInPath={ROUTES.BROWSE}
                    path={ROUTES.SIGN_UP}>
                    <SignUp />
                </IsUserRedirect>
                <ProtectedRoute 
                    user={user}
                    path={ROUTES.BROWSE}
                >
                    <Browse />
                </ProtectedRoute>
                <IsUserRedirect 
                    user={user}
                    loggedInPath={ROUTES.BROWSE}
                    path={ROUTES.HOME}>
                    <Home />
                </IsUserRedirect>
            </Switch>
        </Router>
    );
}
