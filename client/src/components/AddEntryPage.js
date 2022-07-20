import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import {addEntry} from '../store';

// This is used to temporally store the events of the entry before submit.
const events = [];

export default function AddEntryPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Get the username from the global state.
    const username = useSelector(state => state.userData.userInfo.username);

    // Values of all the input boxes
    // The values here are the default initialized values. (initial state)
    const [entryState, setEntryState] = useState({
        type: "Stress",
        level: 1,
        event: [],
        note: "Your note here..."
    });

    // A boolean array for checking the click or unclicked state of the events checkboxes
    const [isCheckedEventsArray, setIsCheckedEventsArray] = useState(
        new Array(6).fill(false)
    );

    /*
     Handles changes in the input boxes (Saves user input to the React State manager)
     e is the event that is accociated with the input box that the user is inputting/using
     make sure to keep the name attribute of html element the same as the key in state object
     checkedPosition is the index of the checkboxes
    */
    const handleChange = (e, checkedPosition=0) => {
        
        // Handle the checkboxes.
        if (e.target.name === "event") {
            // Checks or unchecks each checkbox and maps it to an array of booleans.
            const updatedIsCheckedEventsArray = isCheckedEventsArray.map((checkBoxState, index) =>
                index === checkedPosition ? !checkBoxState : checkBoxState
            );
            setIsCheckedEventsArray(updatedIsCheckedEventsArray);
            
            //let indexAttr = e.target.getAttribute('index');

            console.log("==================================");
            console.log("BEFORE");
            console.log(updatedIsCheckedEventsArray)
            console.log(e.target.name);
            console.log("events:");
            console.log(events);
            //console.log(indexAttr);
            //console.log(parseInt(indexAttr));

            // Transforms the array of booleans of the checkboxes to an array with values for each event.
            // checkBoxState is equal to the value of each item of boolean array
            // The index is equal to the index of the boolean array.
            updatedIsCheckedEventsArray.forEach( (checkBoxState, index) => {
                // Explicitly checking for true value to not make myself confused.
                // same as if(checkBoxState) {}
                console.log("index: " + index);
                if (checkBoxState === true) {
                    // Each index corresponds to the checked or unchecked state of each of the 6 checkboxes.
                    switch(index) {
                        case 0:
                            events[0] = "family";
                            break;
                        case 1:
                            events[1] = "relationship";
                            break;
                        case 2:
                            events[2] = "work";
                            break;
                        case 3:
                            events[3] = "significant";
                            break;
                        case 4:
                            events[4] = "trauma";
                            break;
                        case 5:
                            events[5] = "unknown";
                            break;
                        default: 
                            return 0;
                    }
                }
                else {
                    events[index] = null;
                }
            });

            console.log("==================================");
            console.log("AFTER");
            console.log(updatedIsCheckedEventsArray)
            console.log(e.target.name);
            console.log("events:");
            console.log(events);
            
            // Set the event variable equal to the events array.
            setEntryState({
                ...entryState,
                [e.target.name]: events
            });

            // Escape the function with no errors 
            // This is to prevent the state from being written over by the next setEentryState below this code
            return 0;
        } 
        // Get the value of the input boxes.
        const value = e.target.value;
        // This is used to set the value of all the other input boxes except the checkboxes.
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

    // For JSX rendering
    const checkBoxLabels = [
        "Family problem",
        "Relationship problem",
        "School or work",
        "Significant life event",
        "A traumatic event",
        "I am not sure"
    ];

    return (
        <div className="flex flex-col items-center justify-center my-16">
            <h1 className="my-2">{entryState.type} Tracker</h1>
            <form id="addEntry" className="flex flex-col items-left justify-center  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="#" onSubmit={addNewEntry}>
                
                <div >
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
                    index="0"
                    type="checkbox"
                    name="event" 
                    value="family"
                    checked={isCheckedEventsArray[0]}
                    onChange={(e) => handleChange(e, 0)} 
                />
                <label>Family problem</label>
                </div>

            <div className="checkboxInput">
                <input 
                    index="1"
                    type="checkbox"
                    name="event" 
                    value="relationship"
                    checked={isCheckedEventsArray[1]}
                    onChange={(e) => handleChange(e, 1)}  
                />
                <label>Relationship problem</label>
            </div> 

            <div className="checkboxInput">
                <input 
                    index="2"
                    type="checkbox"
                    name="event" 
                    value="work"
                    checked={isCheckedEventsArray[2]}
                    onChange={(e) => handleChange(e, 2)}
                />
                <label>School or work</label>
            </div>

            <div className="checkboxInput">
                <input 
                    index="3"
                    type="checkbox"
                    name="event" 
                    value="significant"
                    checked={isCheckedEventsArray[3]}
                    onChange={(e) => handleChange(e, 3)}
                />
                <label>Significant life event</label>
            </div>

            <div className="checkboxInput">
                <input 
                    index="4"
                    type="checkbox"
                    name="event" 
                    value="trauma"
                    checked={isCheckedEventsArray[4]}
                    onChange={(e) => handleChange(e, 4)}
                />
                <label>A traumatic event</label>
                </div> 

                <div className="checkboxInput">
                <input 
                    index="5"
                    type="checkbox"
                    name="event" 
                    value="unknown"
                    checked={isCheckedEventsArray[5]}
                    onChange={(e) => handleChange(e, 5)}
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

