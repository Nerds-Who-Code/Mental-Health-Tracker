import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

export default function LoginContainer() {

    //Used for navigating to different routes in the client without buttons
    const navigate = useNavigate();

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
    const authorize = async (e) => {
        //prevents the browser from performing its default behavior when a form is submitted.
        //prevent page from refreshing
        e.preventDefault();

        //Login authorization code
        try {
            //Ask the server to login the user. See /server/APIrouter.js and /server/mockAPI.js to see how this works.  || // eslint-disable-next-line
            let response = await axios.put(`http://localhost:3001/api/loginUser/${loginContainerState.userNameInput}`,
                {password: loginContainerState.passwordInput});
                    
                                    //alert("password is correct");
            //Succesful Login
            //Go to the dashboard after authorization is success (dont forget to replace the url with a real production url)
            navigate("/dashboard");
        } catch (error) {
            //Failed login (Error 404 response from server)
            //This error happens if:
            // 1. Server can not be reached.
            // 2. User with that username is not found.
            // 3. User is found, but password does not match the password if the user.
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

