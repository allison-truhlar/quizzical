import React from "react"
import QuizQuestion from "./QuizQuestion"
import { nanoid } from 'nanoid'

export default function QuizPage(){

    const [quizData, setQuizData] = React.useState([])

    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&encode=base64")
            .then(response => response.json())
            .then(triviaData => {
                const transformedTriviaData = triviaData.results.map(result => {
                    // console.log({...result, id:nanoid()})
                    const decodedIncorrectAnswers = 
                    result.incorrect_answers.map(answer => atob(answer))
                    return({
                        ...result,
                        id: nanoid(),
                        question: atob(result.question),
                        allAnswers: [...decodedIncorrectAnswers, atob(result.correct_answer)]
                    })
                })
                setQuizData(transformedTriviaData)
            })
            .then(console.log(quizData))
      },[])

    const quizElements = quizData.map(quiz => {
        return (<QuizQuestion
            key = {quiz.id}
            question = {quiz.question}
            answers = {quiz.allAnswers}
        />)
    })

    return(
        <div className="quizPage-container">
            {quizElements}
            <button className="quizPage-btn">Check answers</button>
        </div>
    )
}