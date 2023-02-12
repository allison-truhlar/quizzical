import React from "react"

export default function QuizSection(props){

    const answerBtns = props.answers.map(answer => {
        return <button>{answer}</button>
    })

    return(
        <div>
            <p>{props.question}</p>
            {answerBtns}
        </div>

    )
}