import React from 'react'

import './authentication.styles.scss'

//signIn Component
import SignIn from "../components/signin/signin.component"
import SignUp from "../components/signup/signup.component"

function Authentication() {
    return (
        <div className="authentication">
            <SignIn />
            <SignUp/>
        </div>
    )
}

export default Authentication
