import React, {useState} from 'react';
import {Link} from "react-router-dom";

export default function ForgotPasswordContainer() {

    //Value of the email input box
    const [emailInput, setEmailInput] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setEmailInput(value);
    };

    //Login authorization
    const passwordReset = (e) => {
        //prevent page from refreshing
        e.preventDefault();

        //Add reset code here
    };

    return (
        <div>
            <h2>Password reset</h2>
            <h3>Forgot your password?</h3>
            <form action="#" onSubmit={passwordReset}>
            <label for="emailInput">EMAIL</label>
                <br />
                <input 
                    type="email"
                    id="emailInput"
                    placeholder="E-mail"
                    value={emailInput}
                    onChange={handleChange}
                    required 
                />
                <br />
                <input 
                    type="submit" 
                    value="Send" 
                />
            </form>
            <button><Link to="/">Go back</Link></button>
        </div>
    );
}

