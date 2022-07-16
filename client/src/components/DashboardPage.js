import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

export default function DashboardPage() {
    const [name, setName] = useState('');

    // Load username (from database) when the component mounts
    // Not complete yet
    useEffect( () => {
        setName("Peter");
    }, []);

    //Log out code
    const logOut = () => {
        //Add log out code here
    }

    return (
    <div className='w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-cyan-200 to-blue-200 text-slate-800'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <h2 className='text-xl m-2'>Welcome back {name}</h2>
        <h3 className='m-2'>What would you like to do today?</h3> 
        <div className='my-4 flex items-center justify-around'>
            <Link to="/add-entry">
                <button 
                    className='mx-2 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white'>
                    Add new entry
                </button>
            </Link>
            <Link to="/view-entries">
                <button 
                    className='mx-2 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white'>
                    View my entries
                </button>
                </Link>            
        </div>
        {/* <Link to="/"><button className='px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white'onClick={logOut}>Logout</button></Link> */}
    </div>
);
    
}

