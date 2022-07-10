import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

export default function DashboardPage() {
    const [name, setName] = useState('');

    // Load username (from database) when the component mounts
    // Not complete yet
    useEffect( () => {
        setName("Your should be username here");
    }, []);

    //Log out code
    const logOut = () => {
        //Add log out code here
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome back {name}</h2>
            <h3>What would you like to do today?</h3> 
            <Link to="/add-entry"><button>Add new entry</button></Link>
            <br />
            <Link to="/view-entries"><button>View my entries</button></Link>
            <br />
            <Link to="/"><button onClick={logOut}>Logout</button></Link>
        </div>
    );
}

