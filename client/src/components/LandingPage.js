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
    return (
        <div>
            {/**<HeaderImage />*/}
            <LoginContainer />
        </div>
    );
}


