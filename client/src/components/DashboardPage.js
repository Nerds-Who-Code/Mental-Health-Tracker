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
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome back {name}</h2>
            <h3>What would you like to do today?</h3> 
            <Link to="/add-entry"><button>Add new entry</button></Link>
            <br />
            <Link to="/view-entries"><button>View my entries</button></Link>
            <Link to="/entry-overview"><button>Mental Health Overview</button></Link>
            <br />
            <button onClick={logOut}>Logout</button>
        </div>
    );
}

