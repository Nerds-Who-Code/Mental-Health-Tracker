import React, {useState} from 'react';
import {Link} from "react-router-dom";

export default function AddEntryPage() {
    const [type, setType] = useState("Stress");
    const [level, setLevel] = useState(1);

    //Send entry data to the database
    const addNewEntry = (e) => {
        //prevent page from refreshing
        e.preventDefault();

        //New entry code here

    };

    //Set the type when user selects 1 of the 3 radio buttons
    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    //Set the level on user input
    const handleLevelChange = (e) => {
        setLevel(e.target.value);
    };

    return (
        <div>
            <h2>{type} Tracker</h2>
            <form action="#" onSubmit={addNewEntry}>
                <div onchange={handleTypeChange}>
                    <label>
                    <input
                        type="radio"
                        name="type"
                        value="Stress"
                        checked={type === "Stress"}
                    />
                    Stress
                    </label>
                    <br />
                    <label>
                    <input
                        type="radio"
                        name="type"
                        value="Anxiety"
                        checked={type === "Anxiety"}
                    />
                    Anxiety
                    </label>
                    <br />
                    <label>
                    <input
                        type="radio"
                        name="type"
                        value="Depression"
                        checked={type === "Depression"}
                    />
                    Depression
                    </label>
                </div>
                <br />
                <label>On a scale of 1 to 10, one meaning "little to none" <br /> and 10 meaning "extreme" how was your {type.toLowerCase()} level today?</label>
                <br />
                <input 
                    type="range"
                    step="1"
                    min="1" 
                    max="10"
                    onChange={handleLevelChange} />
                <span>{level}</span>
                <br />
                <label>Did anything in particular contribute to your elevated level of {type.toLowerCase()}?</label>
                <br />
                <input 
                    type="checkbox"
                    name="entryEvent" 
                    value="family"/>
                <label>Family problem.</label>
                <br />
                <input 
                    type="checkbox"
                    name="entryEvent" 
                    value="relationship"/>
                <label>Relationship problem.</label>
                <br />
                <input 
                    type="checkbox"
                    name="entryEvent" 
                    value="work"/>
                <label>School or work.</label>
                <br />
                <input 
                    type="checkbox"
                    name="entryEvent" 
                    value="significant"/>
                <label>Significant life event.</label>
                <br />
                <input 
                    type="checkbox"
                    name="entryEvent" 
                    value="trauma"/>
                <label>A traumatic event.</label>
                <br />
                <input 
                    type="checkbox"
                    name="entryEvent" 
                    value="unknown"/>
                <label>I am not sure.</label>
                <br />
                <label>Notes for today's entry (optional):</label>
                <br />
                <input
                    type="textarea" />
                <br />
                <input
                    type="submit"
                    value="Add entry" />
            </form>
            <Link to="/dashboard"><button>Cancel</button></Link>
        </div>
    );
}