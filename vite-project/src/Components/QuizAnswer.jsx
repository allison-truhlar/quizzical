import React from "react"

export default function QuizAnswer(props){

    const styles = {backgroundColor: props.isSelected ? "#D6DBF5" : "#F5F7FB"}

    return(
        <button className="quizAnswer-btn" styles={styles} onClick={()=>props.selectAnswer(props.id)}>
        {props.answer}
        </button>   
    )
}