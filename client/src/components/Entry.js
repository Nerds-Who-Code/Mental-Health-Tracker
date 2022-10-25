import {useDispatch, useSelector} from 'react-redux';
import {deleteEntry} from '../redux/entryDataSlice.js';

//This should be styled like a card.
export default function Entry(props) {
    const dispatch = useDispatch();
    const userID = useSelector(state => state.userData.userInfo.user_id);

    const deleteEntryOnClick = () => {
        //Dispatch an action to the store to delete the entry on the server and the in the global state.
        dispatch(deleteEntry({userID: userID, entryID: props.entryInfo.entry_id}));
    };

    //Change event array to nice string
    let event = "";
    for (let i = 0; i < props.entryInfo.event.length; i++)
    {
        let item = props.entryInfo.event[i];
        if (props.entryInfo.event.length === 1 || 
            i === props.entryInfo.event.length - 1)
        {
            event += item;
        }
        else
        {
            event += item + ", ";
        }
    }

    return (
        <div className="px-4 py-4 odd:bg-white even:bg-blue-100" >
                <span className="entryDate inline-block w-28 px-2">{props.entryInfo.entry_date}</span>
                <span className="entryLevel inline-block w-6 px-2">{props.entryInfo.entry_level}</span>
                <span className="entryType inline-block w-32 px-2">{props.entryInfo.entry_type}</span>
                <span className="entryEvent inline-block w-48 px-2">{event}</span>
                <span className="entryNoteHover inline-block w-6 px-2">📔<div className="hidden inline">{props.entryInfo.note}</div></span>
                <button className="entryEditButton inline-block w-6 px-2">✏️</button>
                <button className="entryDeleteButton inline-block w-8 px-2" onClick={deleteEntryOnClick}>🗑️</button>
        </div>
    )
}

