import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {createUser} from '../mockAPI'; //Dont forget to replace with real API

export default function RegistrationContainer() {

    //Values of all the input boxes
    const [registrationState, setRegistrationState] = useState({
        nameInput: "",
        userNameInput: "",
        emailInput: "",
        passwordInput: "",
        ageInput: 1
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setRegistrationState({
            ...registrationState,
            [e.target.name]: value
        });
    };

    //Registration action
    const register = (e) => {
        //prevent page from refreshing
        e.preventDefault();

        //Registration code (send info to Back-end database)

        //Transform the user inputs to the user data
        let userData = {
            userId: Math.floor(Math.random() * 1000),
            name: registrationState.nameInput,
            username: registrationState.userNameInput,
            email: registrationState.emailInput,
            password: registrationState.passwordInput,
            age: registrationState.ageInput,
            lastLogin: new Date(),
            isLoggedIn: false,
            entries: []
        };
        //Add a new user to the database (dont forget to replace this with real API function)
        createUser(userData);
        //Send user back to the landing page after registration submit
        window.location.href = 'http://localhost:3000/';

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
                    name="nameInput"
                    value={registrationState.nameInput}
                    onChange={handleChange}
                    required 
                />
                <br />
                <label for="userNameInput">USERNAME</label>
                <br />
                <input 
                    type="text"
                    id="userNameInput"
                    placeholder="Username"
                    name="userNameInput"
                    value={registrationState.userNameInput}
                    onChange={handleChange}
                    required 
                />
                <br />
                <label for="emailInput">EMAIL</label>
                <br />
                <input 
                    type="email"
                    id="emailInput"
                    placeholder="E-mail"
                    name="emailInput"
                    value={registrationState.emailInput}
                    onChange={handleChange}
                    required 
                />
                <br />
                <label for="passwordInput">PASSWORD</label>
                <br />
                <input 
                    type="password"
                    id="passwordInput"
                    placeholder="Password"
                    name="passwordInput"
                    value={registrationState.passwordInput}
                    onChange={handleChange}
                    required 
                /> 
                <br />
                <label for="ageInput">AGE</label>
                <br />
                <input 
                    type="number"
                    id="ageInput"
                    placeholder="Age"
                    name="ageInput"
                    value={registrationState.ageInput}
                    onChange={handleChange}
                    required 
                /> 
                <br />
                <input 
                    type="submit" 
                    value="Sign up" 
                />
            </form>
            <Link to="/">Go back</Link>
        </div>
    );
}

