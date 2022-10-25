import React from "react";
import {Link} from "react-router-dom";

/*
    This is a default / standardized button for the app.
    Usage: 
    import NavBtnDefault from "./NavBtnDefault";
    In JSX:
    <NavBtnDefault link="/your-link-here" btnText="your button text here"/>

    //Orginal component name: NavigationalButtonDefault
*/

export default function NavBtnDefault(props) {

    return (
        <React.Fragment>
            <Link to={props.link}>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none mx-2'>
                    {props.btnText}
                </button>
            </Link>
        </React.Fragment>
    )
}
