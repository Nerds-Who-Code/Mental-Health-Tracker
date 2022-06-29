import image from '../images/mental-health-tracker-headerImg.jpg'

export default function HeaderImage() {
    return (
        <img 
            clasName="headerImage" 
            src={image}
            alt="mental health tracking app header image" 
            width="400" 
            height="300" />
    )
}

