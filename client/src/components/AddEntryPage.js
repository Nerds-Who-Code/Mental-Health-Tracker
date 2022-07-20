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
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="my-2">{entryState.type} Tracker</h1>
            <form id="addEntry" className="flex flex-col items-left justify-center  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="#" onSubmit={addNewEntry}>
                
                <div>
                    <div className="radioInput">
                        
                        <input 
                            id="type-stress"
                            type="radio"
                            name="type"
                            value="Stress"
                            checked={entryState.type === "Stress"}
                            onChange={handleChange}
                        />
                        <label forhtml="type-stress">Stress</label>
                    </div>
                    
                    <div className="radioInput">
                       
                        <input
                            id="type-anxiety"
                            type="radio"
                            name="type"
                            value="Anxiety"
                            checked={entryState.type === "Anxiety"}
                            onChange={handleChange}
                        />
                         <label forhtml="type-anxiety">Anxiety</label>
                    </div>

                    <div className="radioInput">
                        
                        <input
                            id="type-depression"
                            type="radio"
                            name="type"
                            value="Depression"
                            checked={entryState.type === "Depression"}
                            onChange={handleChange}
                        />
                        <label forhtml="type-depression">
                        Depression
                        </label>
                    </div>
                </div>
                
                <label className="py-4">On a scale of 0 to 10, 0 meaning "little to none" <br /> and 10 meaning "extreme" how was your {entryState.type.toLowerCase()} level today?</label>
                
                <input
                    className="w-full h-2 bg-gradient-to-r from-green-300 to-blue-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" 
                    type="range"
                    step="1"
                    min="0" 
                    max="10"
                    name="level"
                    value={entryState.level}
                    onChange={handleChange}
                    required
                />
                
                <span className="self-center">{entryState.level}</span>
                
                <label className="py-4">Did anything in particular contribute to your elevated level of {entryState.type.toLowerCase()}?</label>
                
                <div className="checkboxInput">
                <input 
                    type="checkbox"
                    name="event" 
                    value="family"
                    onChange={handleChange} 
                />
                <label>Family problem</label>
                </div>

            <div className="checkboxInput">
                <input 
                    type="checkbox"
                    name="event" 
                    value="relationship"
                    onChange={handleChange} 
                />
                <label>Relationship problem</label>
            </div> 

            <div className="checkboxInput">
                <input 
                    type="checkbox"
                    name="event" 
                    value="work"
                    onChange={handleChange} 
                />
                <label>School or work</label>
             </div>

             <div className="checkboxInput">
                <input 
                    type="checkbox"
                    name="event" 
                    value="significant"
                    onChange={handleChange} 
                />
                <label>Significant life event</label>
            </div>

            <div className="checkboxInput">
                <input 
                    type="checkbox"
                    name="event" 
                    value="trauma"
                    onChange={handleChange} 
                />
                <label>A traumatic event</label>
                </div> 

                <div className="checkboxInput">
                <input 
                    type="checkbox"
                    name="event" 
                    value="unknown"
                    onChange={handleChange} 
                />
                <label>I am not sure</label>
                </div>
                
                <label>Notes for today's entry (optional):</label>

               <div className="flex flex-col items-center">
                <input className="self-stretch m-2 p-1"
                    
                    type="textarea"
                    name="note"
                    value={entryState.note}
                    onChange={handleChange} 
                />
             
                <input className="my-2 mx-2 px-4 py-2 leading-none  rounded text-white  hover:text-white bg-gradient-to-r from-green-300 to-blue-400 hover:from-cyan-200 hover:to-green-300 "
                    type="submit"
                    value="Add entry" 
                />
                </div>
            </form>
            <Link to="/dashboard" className="my-4 hover:text-cyan-500"><button>Cancel</button></Link>
        </div>
    );
}

