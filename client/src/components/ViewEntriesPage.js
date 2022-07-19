import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import {fetchEntries} from "../store";
import Entry from "./Entry";

export default function ViewEntriesPage() {
    const dispatch = useDispatch();
    const username = useSelector(state => state.userData.userInfo.username);
    const entryDataGlobalState = useSelector(state => state.entryData);

    //Get all the user's entries when this component mounts.
    useEffect( () => {
        dispatch(fetchEntries(username));
    }, []);

    //Insert an H3 if the data is still loading.
    let loadingState = null;
    if (entryDataGlobalState.status === 'pending') {
        loadingState = (<h3>Loading...</h3>);
    }
    //Insert an H3 if the data fetching has failed
    let failedState = null;
    if (entryDataGlobalState.status === 'failed') {
        loadingState = (<h3>Something went wrong.</h3>);
    }

    return (
        <div>
            <h2>View your entries</h2>
            <Link to="/dashboard"><button>Go back to dashboard</button></Link>
            {loadingState}
            {failedState}
            {entryDataGlobalState.entryInfo.map( (entry) =>
            <Entry key={entry.entryId} entryInfo={entry}/>)}
        </div>
    )
}

