import {useDispatch, useSelector} from 'react-redux';
// import './Entry.css';
import {deleteEntry} from '../store';

//This should be styled like a card.
export default function Entry(props) {
    const dispatch = useDispatch();
    const username = useSelector(state => state.userData.userInfo.username);

    const deleteEntryOnClick = () => {
        //Dispatch an action to the store to delete the entry on the server and the in the global state.
        dispatch(deleteEntry({username: username, entryId: props.entryInfo.entryId}));
    };

    /*  
        There is a bug here where if the events are more than 1,
        it displays "Unknown"
    */

    return (
        <div className="px-4 py-4 odd:bg-white even:bg-blue-100" >
            
                <span className="entryDate inline-block w-28 px-2">{props.entryInfo.date}</span>
                
                
                <span className="entryLevel inline-block w-6 px-2">{props.entryInfo.level}</span>
                <span className="entryType inline-block w-32 px-2">{props.entryInfo.type}</span>
                <span className="entryEvent inline-block w-48 px-2">{props.entryInfo.event}</span>
                <span className="entryNoteHover inline-block w-6 px-2">📔<div className="hidden inline">{props.entryInfo.notes}</div></span>
                <button className="entryEditButton inline-block w-6 px-2">✏️</button>
                <button className="entryDeleteButton inline-block w-8 px-2" onClick={deleteEntryOnClick}>🗑️</button>
                 
        </div>
    )
}

