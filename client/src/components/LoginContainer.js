import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {getUser} from '../mockAPI';

export default function LoginContainer() {

    //Value of the username input box
    const [userNameInput, setUserNameInput] = useState('');
    //Value of the password input box
    const [passwordInput, setPasswordInput] = useState('');

    //Login authorization
    const authorize = (e) => {
        //prevents the browser from performing its default behavior when a form is submitted.
        //prevent page from refreshing
        e.preventDefault();

        //Login authorization code
        
        if (userNameInput ===  getUser(userNameInput).username && passwordInput === getUser(userNameInput).password) {
            //Go to the dashboard after authorization is success
            window.location.href = 'http://localhost/dashboard';
        //Failed login
        } else {
            alert("Your username or password is wrong");
        }

        
    }

    return (
        <div>
            <h2>Login</h2>
            <h3>Sign in to continue</h3>
            <form action="#" onSubmit={authorize}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={userNameInput} 
                    required />
                <br />
                <input 
                    type="password"
                    placeholder="Password"
                    value={passwordInput}
                    required /> 
                <br />
                <input 
                    type="submit" 
                    value="Log in" />
            </form>
            <Link to="/forgot-password">Forgot password?</Link>
            <hr />
            <button><Link to="/register">Create a new account</Link></button>
        </div>
    );
}