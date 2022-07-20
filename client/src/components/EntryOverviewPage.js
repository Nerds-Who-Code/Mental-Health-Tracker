import {Link} from "react-router-dom";

export default function EntryOverViewPage() {

    let entries = "";

    return (
        <div>
            <h1>Your Mental Health Overview</h1>
            <div>{entries}</div>
            <Link to="/dashboard"><button>Go back to dashboard</button></Link>
        </div>
    )
}
