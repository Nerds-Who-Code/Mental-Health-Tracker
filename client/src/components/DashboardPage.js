import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserData} from '../redux/userDataSlice.js';
import NavBtnDefault from './NavBtnDefault';

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
        else if ("user_id" in userDataGlobalState)
        {
            //fetch more user data from server
            dispatch(fetchUserData(userDataGlobalState.user_id));
        }
    }, []);

    // Load username from global state when the component mounts
    useEffect( () => {
        setName(userDataGlobalState.full_name);
    }, [userDataGlobalState.full_name]);

    return (
    <div className='flex flex-col items-center justify-center text-slate-800 my-16'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <h2 className='text-xl m-2'>Welcome back {name}</h2>
        <h3 className='m-2'>What would you like to do today?</h3> 
        <div className='my-4 flex items-center justify-around'>
            <NavBtnDefault link="/add-entry" btnText="Add new entry" />
            <NavBtnDefault link="/view-entries" btnText="View my entries" />
            <NavBtnDefault link="/entry-overview" btnText="Entry overview" />    
        </div>
        {/* <Link to="/"><button className='px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white'onClick={logOut}>Logout</button></Link> */}
    </div>
    );
}

