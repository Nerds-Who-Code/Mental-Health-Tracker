import HeaderImage from "./HeaderImage";
import LoginContainer from "./LoginContainer";
import demoImage from "../images/mental-health-tracker-demoImg.jpg";

/*
    in <p>Wanna try out our App?</p> Write more about how the app works and reel new users in.
*/

export default function LandingPage() {
  return (
    <div className="landing-font">
      <HeaderImage />
      <LoginContainer />

      <div className="landigPageContent">
        <h1 className="landingPageTitle">Let us help you take care of you</h1>
        <p>Wanna try out our App?</p>
        <img
          clasName="demoImage"
          src={demoImage}
          alt="mental health tracking app demo image"
          width="150"
          height="150"
        />
      </div>
    </div>
  );
}
