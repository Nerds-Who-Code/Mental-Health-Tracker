import {Link} from "react-router-dom";

export default function ViewEntriesPage() {

    let entries = "";

    return (
        <div>
            <h2>View your entries</h2>
            <p>{entries}</p>
            <Link to="/dashboard"><button>Go back to dashboard</button></Link>
        </div>
    )
}

