import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { FirebaseContext } from "../context/firebase"
import { HeaderContainer } from "../containers/header"
import { Form } from "../components"
import { FooterContainer } from "../containers/footer"
import * as ROUTES from "../constants/routes"

export default function SignIn() {
    const history = useHistory()
    const { firebase } = useContext(FirebaseContext)
    const [ error, setError ] = useState('')
    const [ emailAddress, setEmailAddress ] = useState('')
    const [ password, setPassword ] = useState('')

    const isInvalid = (
        password === '' |
        emailAddress === ''
     )

    const handleSignin = (e) => {
        e.preventDefault()
        
        firebase
            .auth()
            .signInWithEmailAndPassword(emailAddress, password)
            .then(() => {
                history.push(ROUTES.BROWSE)
            }).catch((error) => {
                setEmailAddress('')
                setPassword('')
                setError(error.message)
            })
    }

    return (
    <>
        <HeaderContainer>
            <Form>
                <Form.Title>Sign In</Form.Title>
                {error && <Form.Error>{error}</Form.Error>}

                <Form.Base onSubmit={handleSignin} method="POST">
                    <Form.Input
                        placeholder="Email Address"
                        minlength="3"
                        type="email"
                        value={emailAddress}
                        onChange={({ target }) => setEmailAddress(target.value)}
                    />
                    <Form.Input
                        placeholder="Password"
                        type="password"
                        minlength="4"
                        value={password}
                        autoComplete="off"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Form.Submit disabled={isInvalid} type="submit">
                        Sign In
                    </Form.Submit>
                    <Form.Text>
                        New to Netflix? <Form.Link to={ROUTES.SIGN_UP}>Sign up now.</Form.Link>
                    </Form.Text>
                    <Form.TextSmall>
                        This page is protected by Google reCAPTCHA.
                    </Form.TextSmall>
                    {/* <Form.TextSmall>
                        Try signing in as test@geanu.dev, password: test123
                    </Form.TextSmall> */}
                </Form.Base>
            </Form>
        </HeaderContainer>
        <FooterContainer />
    </>
    )
}
