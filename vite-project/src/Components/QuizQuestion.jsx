import React from "react"

export default function QuizQuestion(props){

    const answerBtns = props.answers.map(answer => {
        return <button className="quizQuestion-btn">{answer}</button>
    })

    return(
        <div className="quizQuestion-container">
            <p className="quizQuestion-question">{props.question}</p>
            {answerBtns}
        </div>

    )
}