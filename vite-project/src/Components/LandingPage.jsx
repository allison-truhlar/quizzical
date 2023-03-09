import React from "react"

//The LandingPage component simply contains the app title and a button to start the quiz. 
//The start quiz button accesses the toggleStartQuiz function to change the value of the startQuiz state in App.jsx
export default function LandingPage(props){
    return(
        <div className="landingPage-container">
            <h1 className="landingPage-title">Quizzical</h1>
            <button className="landingPage-btn" onClick={props.toggleStartQuiz}>Start quiz</button>
        </div>
    )
}