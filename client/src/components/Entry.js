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

    return (
        <div className="entryCard">
            <h4>Date Created: {props.entryInfo.date}</h4>
            <hr />
            <p><strong>Type: </strong>{props.entryInfo.type}</p>
            <p><strong>Level: </strong>{props.entryInfo.level}</p>
            <p><strong>Events: </strong> {props.entryInfo.event.filter(item => item !== null).join(", ")}</p>
            <p><strong>Notes: </strong>{props.entryInfo.notes}</p>
            <button>Edit</button>
            <button onClick={deleteEntryOnClick}>Delete</button>
        </div>
    )
}

