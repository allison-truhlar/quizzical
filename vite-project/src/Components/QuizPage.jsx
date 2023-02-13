import React from "react"
import QuizQuestion from "./QuizQuestion"
import { nanoid } from 'nanoid'

export default function QuizPage(props){

    const quizElements = props.quizData.map(quiz => {

        const decodedIncorrectAnswers = 
            quiz.incorrect_answers.map(answer => atob(answer))

        return (<QuizQuestion
            key = {nanoid()}
            question = {atob(quiz.question)}
            answers = {[...decodedIncorrectAnswers, atob(quiz.correct_answer)]}
        />)
    })

    return(
        <div className="quizPage-container">
            {quizElements}
            <button className="quizPage-btn">Check answers</button>
        </div>
    )
}