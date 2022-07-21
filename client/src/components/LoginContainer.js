import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../store';

export default function LoginContainer() {
    // Used for navigating to different routes in the client without buttons
    const navigate = useNavigate();
    // Used for dispatching actions to the global state (store.js).
    const dispatch = useDispatch();
    // Get the userData from the global state
    const userDataGlobalState = useSelector(state => state.userData);

    /*
        You can use any account in mockData.js to login. Just use the values of username and password.
        The easiest account to login is:
        username: test123
        password: test
    */

    // Values of the username and password input boxes
    const [loginContainerState, setLoginContainerState] = useState({
        userNameInput: "",
        passwordInput: ""
    });

    // Handles changes in the input boxes (Saves user input to the React State manager)
    // e is the event that is accociated with the input box that the user is inputting/using
    // make sure to keep the name attribute of html element the same as the key in state object
    const handleChange = (e) => {
        const value = e.target.value;
        setLoginContainerState({
            ...loginContainerState,
            [e.target.name]: value
        });
    };

    // This will listen if the the global state has updated.
    // Depending on the status of the global state triggered by a dispatch from the login button
    // Login will happen or not.
    useEffect(() => {
        if(userDataGlobalState.status === "success") {
            // Succesful Login
            
            /**
             * @note      [defensive programming] userInfo may be undefined, use optional chaining  
             * @example   object?.prop1?.prop2
             * 
             * @link      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
             */
            if (userDataGlobalState.userInfo?.isLoggedIn === true) {
                // Go to the dashboard after authorization is success (dont forget to replace the url with a real production url)
                navigate("/dashboard");
            }
        } else if (userDataGlobalState.userInfo?.isLoggedIn === false || 
            userDataGlobalState.status === "failed") {
                // Failed login (Error 404 response from server)
                // This error happens if:
                // 1. Server can not be reached.
                // 2. User with that username is not found.
                // 3. User is found, but password does not match the password of the user.
                alert("Your username or password is wrong");
            }
    }, [userDataGlobalState]);

    // Login authorization code
    const authorize = async (e) => {
        // prevents the browser from performing its default behavior when a form is submitted.
        // prevent page from refreshing
        e.preventDefault();
        // Retrieve the user data from the server and store it in the global state. See store.js for how this happens.
        dispatch(
          loginUser({
            username: loginContainerState.userNameInput, 
            password: loginContainerState.passwordInput /**@todo passwords should be sent hashed/encrypted */
          })
        )
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="my-4">Login</h1>
             
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="#" onSubmit={authorize}>
                <div className="mb-4">
                    <label htmlFor="userNameInput">
                        Username
                    </label>
                    <input 
                        type="text"
                        placeholder="Username"
                        name="userNameInput"
                        value={loginContainerState.userNameInput} 
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="passwordInput">
                        Password
                    </label>
                    <input 
                        type="password"
                        placeholder="Password"
                        name="passwordInput"
                        value={loginContainerState.passwordInput}
                        onChange={handleChange}
                        required 
                    /> 
                </div>
            
                <div className="flex flex-col items-center justify-between">
                    <button className="formButton" type="submit" value="Log in">
                        Log In
                    </button>
                </div>
            </form>
            <div className="my-2 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                <Link to="/forgot-password">Forgot password?</Link>
            </div>
            
            <Link className="my-4 hover:text-cyan-500" to="/register">Create a new account</Link>
        </div>
    );

}

