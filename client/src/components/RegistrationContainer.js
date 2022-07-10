import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

export default function RegistrationContainer() {

    //Used for navigating to different routes in the client without buttons
    const navigate = useNavigate();

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
    const register = async (e) => {
        //prevent page from refreshing
        e.preventDefault();

        //Registration code (send info to Back-end database)

        //Transform the user inputs to the user data
        //The userId will be generated on the server.
        let userData = {
            userId: 0,
            name: registrationState.nameInput,
            username: registrationState.userNameInput,
            email: registrationState.emailInput,
            password: registrationState.passwordInput,
            age: registrationState.ageInput,
            lastLogin: "00-00-0000", 
            isLoggedIn: false,
            entries: []
        };

        try {
            //Ask the server to add a new user to the database || // eslint-disable-next-line
            let createdUser = await axios.post(`http://localhost:3001/api/createUser/${registrationState.userNameInput}`, {user: userData});
            console.log(createdUser);
            
            alert("successfully registered");
            //Send user back to the landing page after registration submit
            navigate("/")
        } catch (error) {
            console.log(error);
            alert("Something went wrong while creating your account.");
        }
        //createUser(userData);
    }

    return (
        <div>
            <h2>Create a new account</h2>
            <h3>Already registered? <Link to="/">Login here</Link></h3>
            <form action="#" onSubmit={register}>
                <label htmlFor="nameInput">NAME</label>
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
                <label htmlFor="userNameInput">USERNAME</label>
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
                <label htmlFor="emailInput">EMAIL</label>
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
                <label htmlFor="passwordInput">PASSWORD</label>
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
                <label htmlFor="ageInput">AGE</label>
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

