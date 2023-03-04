import React from "react"

export default function QuizAnswer(props){

    const styles = {backgroundColor: props.isSelected ? "#59E391" : "#FFFFFF"}

    return(
        <button className="quizAnswer-btn" style={styles} onClick={()=>props.selectAnswer(props.id)}>
        {props.answer}
        </button>   
    )
}