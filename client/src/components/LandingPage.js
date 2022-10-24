import {useEffect} from 'react';
import axios from 'axios';
import HeaderImage from "./HeaderImage";
import LoginContainer from "./LoginContainer";
import demoImage from "../images/mental-health-tracker-demoImg.jpg" 

/*
    in <p>Wanna try out our App?</p> Write more about how the app works and reel new users in.
*/
const stuff= (<div className="landigPageContent">
<h1 className="landingPageTitle">Let us help you take care of you</h1>
<p>Wanna try out our App?</p>
<img 
    className="demoImage" 
    src={demoImage}
    alt="mental health tracking app demo image" 
    width="150" 
    height="150" />            
</div>
)

export default function LandingPage() {

    //Simple test to see if the back-end server can reached
    //May overload server if too many page refreshesh?
    useEffect( () => {
        //useEffect does not allow async so another sync function is inside
        (async () => {
            try {
                await axios.get(
                    `http://localhost:3001/test`
                );
            }
            catch 
            {
                alert("ERROR: Server can not be reached.");
            }
        })();
    }, []);    

    return (
        <div>
            {/**<HeaderImage />*/}
            <LoginContainer />
        </div>
    );
}


