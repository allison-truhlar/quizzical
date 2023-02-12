import React from "react"
import QuizSection from "./QuizSection"
import { nanoid } from 'nanoid'

export default function QuizPage(props){

    const quizElements = props.quizData.map(quiz => {

        const decodedIncorrectAnswers = 
            quiz.incorrect_answers.map(answer => atob(answer))

        return (<QuizSection
            key = {nanoid()}
            question = {atob(quiz.question)}
            answers = {[...decodedIncorrectAnswers, atob(quiz.correct_answer)]}
        />)
    })

    return(
        <div>
            {quizElements}
            <button className="quizPage-btn">Check answers</button>
            <img src="./quizPage-blue-blob.png" className="quizPage-bottomBlob"/>
        </div>
    )
}