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
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="my-2">Create a new account</h1>
            <h3 className="my-2">Already registered? <Link className="my-4 hover:text-cyan-500" to="/">Login here</Link></h3>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="#" onSubmit={register}>
            <div class="mb-4">
                <label for="nameInput">Name</label>
               
                <input 
                    type="text"
                    id="nameInput"
                    placeholder="Name"
                    name="nameInput"
                    value={registrationState.nameInput}
                    onChange={handleChange}
                    required 
                />
            </div>
            <div class="mb-6">
                <label for="userNameInput">Username</label>
               
                <input 
                    type="text"
                    id="userNameInput"
                    placeholder="Username"
                    name="userNameInput"
                    value={registrationState.userNameInput}
                    onChange={handleChange}
                    required 
                />
            </div>
            <div class="mb-6">
                <label for="emailInput">Email</label>
               
                <input 
                    type="email"
                    id="emailInput"
                    placeholder="E-mail"
                    name="emailInput"
                    value={registrationState.emailInput}
                    onChange={handleChange}
                    required 
                />
             </div>  
             <div className="mb-6">
                <label for="passwordInput">Password</label>
               
                <input 
                    type="password"
                    id="passwordInput"
                    placeholder="Password"
                    name="passwordInput"
                    value={registrationState.passwordInput}
                    onChange={handleChange}
                    required 
                /> 
                  </div>  
                  <div className="mb-6">
                <label for="ageInput">Age</label>
               
                <input 
                    type="number"
                    id="ageInput"
                    placeholder="Age"
                    name="ageInput"
                    value={registrationState.ageInput}
                    onChange={handleChange}
                    required 
                /> 
               </div>
                <input  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" 
                    value="Sign up" 
                />
            </form>
            <a className="my-4 hover:text-cyan-500"><Link to="/">Go back</Link></a>
        </div>
    );
}

