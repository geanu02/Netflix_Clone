import React, { useState } from "react"
import { HeaderContainer } from "../containers/header"
import { Form } from "../components"
import * as ROUTES from "../constants/routes"

export default function SignIn() {
    const [ error, setError ] = useState('')
    const [ emailAddress, setEmailAddress ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleSignin = (e) => {
        e.preventDefault()
    }
    return (
        <HeaderContainer>
            <Form>
                <Form.Title>Sign In</Form.Title>
                {error && <Form.Error>{error}</Form.Error>}

                <Form.Base onSubmit={handleSignin} method="POST">
                    <Form.Input
                        placeholder="Email Address"
                        value={emailAddress}
                        onChange={({ target }) => setEmailAddress(target.value)}
                    />
                    <Form.Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        autoComplete="off"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Form.Submit disabled={false} type="submit">
                        Sign In
                    </Form.Submit>
                    <Form.Text>
                        New to Netflix? <Form.Link to={ROUTES.SIGN_UP}>Sign up now.</Form.Link>
                    </Form.Text>
                    <Form.TextSmall>
                        This page is protected by Google reCAPTCHA.
                    </Form.TextSmall>
                </Form.Base>
            </Form>
        </HeaderContainer>
    )
}
