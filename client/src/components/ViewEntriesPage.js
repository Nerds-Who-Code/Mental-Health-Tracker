import React, {useEffect} from "react";
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

    // Insert an H3 if the data is still loading.
    let loadingState = null;
    if (entryDataGlobalState.status === 'pending') {
        loadingState = (<h3>Loading...</h3>);
    }
    // Insert an H3 if the data fetching has failed
    let failedState = null;
    if (entryDataGlobalState.status === 'failed') {
        loadingState = (<h3>Something went wrong.</h3>);
    }

    // This is displayed when the user has not added any entries yet.
    let noEntries = null;
    if (entryDataGlobalState.entryInfo.length === 0) {
        noEntries = (
            <React.Fragment>
            <h3>You have not added any entries yet...</h3>
            <Link to="/add-entry"><button>Add new entry</button></Link>
            </React.Fragment>);
    }
    
    return (
        <div>
            <h2>View your entries</h2>
            <Link to="/dashboard"><button>Go back to dashboard</button></Link>
            {loadingState}
            {failedState}
            {noEntries}
            {entryDataGlobalState.entryInfo.map( (entry) =>
            <Entry key={entry.entryId} entryInfo={entry}/>)}
        </div>
    )
}

