import React, {useState} from 'react';
import {Link} from "react-router-dom";

export default function ForgotPasswordContainer() {

    //Value of the email input box
    const [emailInput, setEmailInput] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setEmailInput(value);
    };

    //Login authorization
    const passwordReset = (e) => {
        //prevent page from refreshing
        e.preventDefault();

        //Add reset code here
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="my-4">Password reset</h1>
            <form className="flex flex-col items-center justify-center" action="#" onSubmit={passwordReset}>
            <label for="emailInput">Enter your email</label>
                <br />
                <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="email"
                    id="emailInput"
                    placeholder="E-mail"
                    value={emailInput}
                    onChange={handleChange}
                    required 
                />
                <br />
                <input className='px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white'
                    type="submit" 
                    value="Send" 
                />

            </form>
            <button className="my-4 hover:text-cyan-500"><Link to="/">Go back</Link></button>
        </div>
    );
}

