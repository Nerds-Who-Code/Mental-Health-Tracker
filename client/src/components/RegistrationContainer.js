import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios'; // Library for sending HTTP Requests
import * as yup from 'yup' // Library for custom form validation

// Create the validation schema for form validation.
const formSchema = yup.object().shape({
    nameInput: yup.string()
                    .min(3)
                    .max(50)
                    .required(),
    userNameInput: yup.string()
                    .min(3)
                    .max(25)
                    .required(),
    emailInput: yup.string()
                    .email()
                    .min(6)
                    .max(50)
                    .required(),
    passwordInput: yup.string()
                    .min(3)
                    .max(16)
                    .required(),
    ageInput: yup.number()
                    .positive()
                    .integer()
                    .min(1)
                    .max(125)
                    .required(),
});

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

    // State for all the form errors
    const [formErrors, setFormErrors] = useState({
        nameInput: false,
        userNameInput: false,
        emailInput: false,
        passwordInput: false,
        ageInput: false,
      });

    const handleChange = (e) => {
        const value = e.target.value;
        setRegistrationState({
            ...registrationState,
            [e.target.name]: value
        });
    };

    //Registration action (OnSubmit form)
    const register = async (e) => {
        //prevent page from refreshing
        e.preventDefault();

        // Validate the input data. (Check if schema of the form is valid.)
        // abortEarly prevents aborting validation after first error
        const isFormValid = await formSchema.isValid(registrationState, { abortEarly: false });
        let userData = {};
        // If the form is valid
        if(isFormValid) {
            //Transform the user inputs to the user data
            //The userId will be generated on the server.
            userData = {
                userId: 0,
                name: registrationState.nameInput,
                username: registrationState.userNameInput,
                email: registrationState.emailInput,
                password: registrationState.passwordInput,
                age: registrationState.ageInput,
                lastLogin: "0000-00-00", 
                isLoggedIn: false,
                entries: []
            };
        // If the form is not valid
        } else {
            alert("Form is not valid.")
        }

        //Registration code (send info to Back-end database)
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
                    minLength="3"
                    maxLength="50"
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
                    minLength="3"
                    maxLength="25"
                    pattern="[a-zA-Z0-9]+"
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
                    minLength="6"
                    maxLength="50"
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
                    minLength="3"
                    maxLength="16"
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
                    min="1"
                    max="125"
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

