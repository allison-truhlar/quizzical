import React from "react"

export default function QuizAnswer(props){

    let hexCode = ""
    if (props.hasBeenChecked) {
        if (props.isCorrectAnswer) {
            hexCode = "#94D7A2"
        } else if (props.isSelected) {
            hexCode = "#F8BCBC"
        }
    } else if (props.isSelected) {
        hexCode = "#D6DBF5"
    } else {
        hexCode = "#F5F7FB"
    }
    const styles={backgroundColor: hexCode}

    return(
        <button className="quizAnswer-btn" style={styles} onClick={()=>props.selectAnswer(props.answerId, props.questionId)}>
        {props.answer}
        </button>   
    )
}