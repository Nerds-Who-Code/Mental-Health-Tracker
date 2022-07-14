import './Entry.css';

export default function Entry(props) {

    //This should be styled like a card.

    return (
        <div className="entryCard">
            <h4>Date Created: {props.entryInfo.date}</h4>
            <hr />
            <p><strong>Type: </strong>{props.entryInfo.type}</p>
            <p><strong>Level: </strong>{props.entryInfo.level}</p>
            <p><strong>Events: </strong>{props.entryInfo.event}</p>
            <p><strong>Notes: </strong>{props.entryInfo.notes}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}

