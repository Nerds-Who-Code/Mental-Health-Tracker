
export default function AboutPage() {

    const contributersList = [
        {name: "Nerds Who Code",     link: "https://github.com/Nerds-Who-Code"},
        {name: "nicolecarman",       link: "https://github.com/nicolecarman"},
        {name: "lyallstewart",       link: "https://github.com/lyallstewart"},
        {name: "steph-koopmanschap", link: "https://github.com/steph-koopmanschap"},
        {name: "med4kat",            link: "https://github.com/med4kat"},
        {name: "xintamosaik",        link: "https://github.com/xintamosaik"},
        {name: "ooddaa",             link: "https://github.com/ooddaa"},
    ];

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1>About</h1>
            <p>The Feelsify mental health tracker app allows you to track your mental health daily. <br />
               You have the option to track 3 types of mental health.
            </p>
            <ul>
                <li>Stress</li>
                <li>Anxiety</li>
                <li>Depression</li>
            </ul>

            <h2>This is an open source project</h2>
            <a href="https://github.com/Nerds-Who-Code/Mental-Health-Tracker">Feelsify on Github</a>

            <h2>Contributers</h2>
            <ul>
                {contributersList.map((contributer) => {
                    return <li className="py-2">
                            Name: {contributer.name} <br />
                            Link: {contributer.link}
                            </li>;
                })}
            </ul>
        </div>
    )
}

