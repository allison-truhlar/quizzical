import React from "react"

export default function LandingPage(props){
    return(
        <div>
            <h1 className="landingPage-title">Quizzical</h1>
            <button className="landingPage-btn" onClick={props.toggleStartQuiz}>Start quiz</button>
            <img src="./blue-blob.png" className="landingPage-bottomBlob"/>
        </div>
    )
}