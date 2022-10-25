import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

export default function ForgotPasswordContainer() {

    //Value of the email input box
    const [emailInput, setEmailInput] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setEmailInput(value);
    };

    const passwordReset = async (e) => {
        //prevent page from refreshing
        e.preventDefault();

        //Add reset code here

        //Ask the server first if the email already exists in the database?
        // try {
        //     let response = await axios.put(
        //         `http://localhost:3001/api/user/password-reset`,
        //     );
        //     if (response.status === 201) {
        //     }
        // }
        // catch (error)
        // {
        //     console.log(error);
        // }

        
    };

    return (
        <div className="flex flex-col items-center justify-center my-16">
            <h1 className="my-4">Password reset</h1>
            <form className="flex flex-col items-center justify-center" action="#" onSubmit={passwordReset}>
            <label htmlFor="emailInput" className='my-2'>Enter your email</label>
                <input 
                    type="email"
                    id="emailInput"
                    placeholder="E-mail"
                    value={emailInput}
                    onChange={handleChange}
                    required 
                />
                
                <input className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none my-2'
                    type="submit" 
                    value="Send" 
                />

            </form>
            <div className="my-4 hover:text-cyan-500"><Link to="/">Go back</Link></div>
        </div>
    );
}

