import React, {useState} from 'react';
import {Link} from "react-router-dom";

export default function RegistrationContainer() {

     //Value of the name input box
    const [nameInput, setNameInput] = useState('');
    //Value of the username input box
    const [userNameInput, setUserNameInput] = useState('');
    //Value of the email input box
    const [emailInput, setEmailInput] = useState('');
    //Value of the password input box
    const [passwordInput, setPasswordInput] = useState('');
    //Value of the age input box
    const [ageInput, setAgeInput] = useState('');

    //Registration action
    const register = (e) => {
        //prevent page from refreshing
        e.preventDefault();

        //Registration code (send info to Back-end database)
    }
    return (
        <div>
            <h2>Create a new account</h2>
            <h3>Already registered? <Link to="/">Login here</Link></h3>
            <form action="#" onSubmit={register}>
                <label for="nameInput">NAME</label>
                <br />
                <input 
                    type="text"
                    id="nameInput"
                    placeholder="Name"
                    value={nameInput} 
                    required />
                <br />
                <label for="userNameInput">USERNAME</label>
                <br />
                <input 
                    type="text"
                    id="userNameInput"
                    placeholder="Username"
                    value={userNameInput} 
                    required />
                <br />
                <label for="emailInput">EMAIL</label>
                <br />
                <input 
                    type="email"
                    id="emailInput"
                    placeholder="E-mail"
                    value={emailInput} 
                    required />
                <br />
                <label for="passwordInput">PASSWORD</label>
                <br />
                <input 
                    type="password"
                    id="passwordInput"
                    placeholder="Password"
                    value={passwordInput} 
                    required /> 
                <br />
                <label for="ageInput">AGE</label>
                <br />
                <input 
                    type="number"
                    id="ageInput"
                    placeholder="Age"
                    value={ageInput} 
                    required /> 
                <br />
                <input 
                    type="submit" 
                    value="Sign up" />
            </form>
            <a href="#">Forgot password?</a>
        </div>
    );
}