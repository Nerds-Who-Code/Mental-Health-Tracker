import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {getUser, updateUser} from '../mockAPI'; //Dot forget to replace with real API

export default function LoginContainer() {

    /*
        You can use any account in mockData.js to login. Just use the values of username and password.
        The easiest account to login is:
        username: test123
        password: test
    */

    //Values of the username and password input boxes
    const [loginContainerState, setLoginContainerState] = useState({
        userNameInput: "",
        passwordInput: ""
    });

    //Handles changes in the input boxes (Saves user input to the React State manager)
    //e is the event that is accociated with the input box that the user is inputting/using
    //make sure to keep the name attribute of html element the same as the key in state object
    const handleChange = (e) => {
        const value = e.target.value;
        setLoginContainerState({
            ...loginContainerState,
            [e.target.name]: value
        });
    };

    //Login authorization
    const authorize = (e) => {
        //prevents the browser from performing its default behavior when a form is submitted.
        //prevent page from refreshing
        e.preventDefault();

        //Login authorization code
        //Replace this code by an authorization with the Database
        
        if (loginContainerState.userNameInput === getUser(loginContainerState.userNameInput).username && 
            loginContainerState.passwordInput === getUser(loginContainerState.userNameInput).password) {

            //Change user status to logged in
            updateUser(loginContainerState.userNameInput, 'isLoggedIn', true) // Dont forget to replace this with real API function
            updateUser(loginContainerState.userNameInput, 'lastLogin', new Date()) // Dont forget to replace this with real API function

            //Go to the dashboard after authorization is success (dont forget to replace the url with a real production url)
            window.location.href = 'http://localhost:3000/dashboard';
        //Failed login
        } else {
            alert("Your username or password is wrong");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <h3>Sign in to continue</h3>
            <form action="#" onSubmit={authorize}>
                <input 
                    type="text"
                    placeholder="Username"
                    name="userNameInput"
                    value={loginContainerState.userNameInput} 
                    onChange={handleChange}
                    required 
                />
                <br />
                <input 
                    type="password"
                    placeholder="Password"
                    name="passwordInput"
                    value={loginContainerState.passwordInput}
                    onChange={handleChange}
                    required 
                /> 
                <br />
                <input 
                    type="submit" 
                    value="Log in" 
                />
            </form>
            <Link to="/forgot-password">Forgot password?</Link>
            <hr />
            <button><Link to="/register">Create a new account</Link></button>
        </div>
    );
}

