import React, { useState } from "react"
import { HeaderContainer } from "../containers/header"
import { FooterContainer } from "../containers/footer"
import { Form } from "../components"
import * as ROUTES from "../constants/routes"

export default function SignUp() {
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ emailAddress, setEmailAddress ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')

    const isInvalid = (
        firstName === '' || 
        lastName === '' ||
        emailAddress === '' ||
        password === '' )

    const handleSignup = (e) => e.preventDefault()

    return (
        <>
            <HeaderContainer>
                <p>Sign Up Page</p>
            
            <Form>
                <Form.Title>Sign Up</Form.Title>
                {error && <Form.Error>{error}</Form.Error>}
                <Form.Base 
                    onSubmit={handleSignup} 
                    method="POST"
                >
                    <Form.Input
                        placeholder="First Name"
                        value={ firstName }
                        onChange={({ target }) => setFirstName(target.value)}
                    />
                    <Form.Input
                        placeholder="Last Name"
                        value={ lastName }
                        onChange={({ target }) => setLastName(target.value)}
                    />
                    <Form.Input
                        placeholder="Email Address"
                        type="email"
                        minlength="3"
                        value={ emailAddress }
                        onChange={({ target }) => setEmailAddress(target.value)}
                    />
                    <Form.Input
                        placeholder="Password"
                        type="password"
                        minlength="4"
                        autoComplete="off"
                        value={ password }
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Form.Submit 
                        disabled={ isInvalid } 
                        type="submit"
                    >
                        Register
                    </Form.Submit>
                    <Form.Text>
                        Already have Netflix? <Form.Link to={ROUTES.SIGN_IN}>
                            Sign in here.
                        </Form.Link>
                    </Form.Text>
                    <Form.TextSmall>
                        This page is protected by Google reCAPTCHA.
                    </Form.TextSmall>
                </Form.Base>
            </Form>
            </HeaderContainer>
            <FooterContainer />
        </>
    )
}