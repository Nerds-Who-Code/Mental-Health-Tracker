import HeaderImage from "./HeaderImage";
import LoginContainer from "./LoginContainer";

/*
 in <p>Wanna try out our App?</p> Write more about how the app works and reel new users in.
*/

export default function LandingPage() {
    return (
        <div>
            <HeaderImage />
            <LoginContainer />
        
            <div className="landigPageContent">
                <h1 className="landingPageTitle">Let us help you take care of you</h1>
                <p>Wanna try out our App?</p>
                <img 
                    clasName="demoImage" 
                    src="../images/mental-health-tracker-demoImg.jpg" 
                    alt="mental health tracking app demo image" 
                    width="150" 
                    height="150" />            
            </div>
        </div>
    );
}