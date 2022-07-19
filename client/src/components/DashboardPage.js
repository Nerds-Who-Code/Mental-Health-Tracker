import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../store';

export default function DashboardPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userDataGlobalState = useSelector(state => state.userData.userInfo);
    const [name, setName] = useState("Your name should be here.");

    // Check if the user is logged in. If not send them back to the dashboard.
    // This prevents people from manually typing in /dashboard in the url without logging in.
    // Prevent bypassing login.
    useEffect( () => {
        //Check if user data in global state is empty.
        if(JSON.stringify(userDataGlobalState) === '{}') {
            alert("Login required!");
            navigate("/");
        }
    }, []);

    // Load username from global state when the component mounts
    useEffect( () => {
        setName(userDataGlobalState.name);
    }, [userDataGlobalState.name]);

    // Log out code
    const logOut = () => {
        dispatch(logoutUser(userDataGlobalState.username));
        // Navigate back to the main page.
        navigate("/");
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

