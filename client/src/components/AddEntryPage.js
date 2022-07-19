import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import {addEntry} from '../store';

export default function AddEntryPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(state => state.userData.userInfo.username);

    // Values of all the input boxes
    // The values here are the default initialized values. (initial state)
    const [entryState, setEntryState] = useState({
        type: "Stress",
        level: 1,
        event: "work",
        note: "Your note here..."
    });

    // Handles changes in the input boxes (Saves user input to the React State manager)
    // e is the event that is accociated with the input box that the user is inputting/using
    // make sure to keep the name attribute of html element the same as the key in state object
    const handleChange = (e) => {
        //const value = evt.target.type === "checkbox" ? e.target.checked : e.target.value;
        const value = e.target.value;
        setEntryState({
            ...entryState,
            [e.target.name]: value
        });
    };

    // Send entry data to the database
    const addNewEntry = (e) => {
        //prevent page from refreshing
        e.preventDefault();

        // Transform the user inputs to the entry data
        // The entryId and date will be generated on the server.
        let entryData = {
            entryId: 0,
            date: "0000-00-00",
            type: entryState.type,
            level: entryState.level,
            event: entryState.event,
            notes: entryState.note
        };

        //Dispatch action to the global state to tell the server to add the new entry.
        dispatch(addEntry({username: username, entry: entryData}));

        alert("Your new entry has been added.");
        //Send user back to the dashboard after entry submit
        navigate("/dashboard");
    };

    return (
        <div>
            <h2>{entryState.type} Tracker</h2>
            <form action="#" onSubmit={addNewEntry}>
                <div>
                    <label>
                    <input
                        type="radio"
                        name="type"
                        value="Stress"
                        checked={entryState.type === "Stress"}
                        onChange={handleChange}
                    />
                    Stress
                    </label>
                    <br />
                    <label>
                    <input
                        type="radio"
                        name="type"
                        value="Anxiety"
                        checked={entryState.type === "Anxiety"}
                        onChange={handleChange}
                    />
                    Anxiety
                    </label>
                    <br />
                    <label>
                    <input
                        type="radio"
                        name="type"
                        value="Depression"
                        checked={entryState.type === "Depression"}
                        onChange={handleChange}
                    />
                    Depression
                    </label>
                </div>
                <br />
                <label>On a scale of 1 to 10, one meaning "little to none" <br /> and 10 meaning "extreme" how was your {entryState.type.toLowerCase()} level today?</label>
                <br />
                <input 
                    type="range"
                    step="1"
                    min="1" 
                    max="10"
                    name="level"
                    value={entryState.level}
                    onChange={handleChange}
                    required
                />
                <span>{entryState.level}</span>
                <br />
                <label>Did anything in particular contribute to your elevated level of {entryState.type.toLowerCase()}?</label>
                <br />
                <input 
                    type="checkbox"
                    name="event" 
                    value="family"
                    onChange={handleChange} 
                />
                <label>Family problem.</label>
                <br />
                <input 
                    type="checkbox"
                    name="event" 
                    value="relationship"
                    onChange={handleChange} 
                />
                <label>Relationship problem.</label>
                <br />
                <input 
                    type="checkbox"
                    name="event" 
                    value="work"
                    onChange={handleChange} 
                />
                <label>School or work.</label>
                <br />
                <input 
                    type="checkbox"
                    name="event" 
                    value="significant"
                    onChange={handleChange} 
                />
                <label>Significant life event.</label>
                <br />
                <input 
                    type="checkbox"
                    name="event" 
                    value="trauma"
                    onChange={handleChange} 
                />
                <label>A traumatic event.</label>
                <br />
                <input 
                    type="checkbox"
                    name="event" 
                    value="unknown"
                    onChange={handleChange} 
                />
                <label>I am not sure.</label>
                <br />
                <label>Notes for today's entry (optional):</label>
                <br />
                <input
                    type="textarea"
                    name="note"
                    value={entryState.note}
                    onChange={handleChange} 
                />
                <br />
                <input
                    type="submit"
                    value="Add entry" 
                />
            </form>
            <Link to="/dashboard"><button>Cancel</button></Link>
        </div>
    );
}

