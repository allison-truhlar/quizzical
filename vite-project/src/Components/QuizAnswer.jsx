import React from "react"

export default function QuizAnswer(props){

    //Set the color and "disabled" property of the answer buttons after the check answer button is clicked
    //This sets hasBeenChecked state to true, and then all the answer buttons are disabled
    //Based on whether each answer was selected and is the correct answer, the color is set
    let hexCode = ""
    let isDisabled = false
    if (props.hasBeenChecked) {
        isDisabled = true
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
        <button 
            className="quizAnswer-btn" 
            style={styles} 
            disabled = {isDisabled}
            onClick={()=>props.selectAnswer(props.answerId, props.questionId)}
        >
        {props.answer}
        </button>   
    )
}