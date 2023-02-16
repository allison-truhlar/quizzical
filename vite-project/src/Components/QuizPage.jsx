import React from "react"
import QuizQuestion from "./QuizQuestion"
import QuizAnswer from "./QuizAnswer"
import { nanoid } from 'nanoid'

export default function QuizPage(){

    const [quizData, setQuizData] = React.useState([])
    const [quizAnswers, setQuizAnswers] = React.useState([])

    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&encode=base64")
            .then(response => response.json())
            .then(triviaData => {
                
                const questionData = triviaData.results.map(result => {
                    // console.log({...result, id:nanoid()})
                    const decodedIncorrectAnswers = 
                    result.incorrect_answers.map(answer => atob(answer))
                    return({
                        ...result,
                        questionId: nanoid(),
                        question: atob(result.question),
                        allAnswers: [...decodedIncorrectAnswers, atob(result.correct_answer)],
                        correctAnswer:atob(result.correct_answer)
                    })
                })
                setQuizData(questionData)

                const answerData = questionData.map(question =>{
                    const currentCorrectAnswer = question.correctAnswer
                    const questionId = question.questionId
                    // console.log(currentCorrectAnswer)
                    return(question.allAnswers.map(answer =>{
                        const answerId = nanoid()
                        const isCorrectAnswer = (answer==currentCorrectAnswer ? true : false)
                        return({
                            answerId:answerId,
                            answer: answer,
                            isCorrectAnswer: isCorrectAnswer,
                            isSelected:false
                        })
                    }))
                })
                setQuizAnswers(answerData)
                console.log(answerData)
                           
            })
            // .then(console.log(quizData))
      },[])

       
      const quizElements = quizData.map((quiz, index) => {
        const matchingQuizAnswers = quizAnswers[index]
        console.log(matchingQuizAnswers)
        const quizAnswerElements = matchingQuizAnswers.map(answer => {
            return(
                <QuizAnswer
                    key={answer.answerId}
                    id={answer.answerId}
                    answer = {answer.answer}
                    isCorrectAnswer = {answer.isCorrectAnswer}
                    isSelected = {answer.isSelected}
                />)
        })
        return (
            <div className="quizElement-container">
                <QuizQuestion
                    key = {quiz.questionId}
                    question = {quiz.question}
                />
               {quizAnswerElements}
            </div>
        )
    })

    

    return(
        <div className="quizPage-container">
            {quizElements}
            <button className="quizPage-btn">Check answers</button>
        </div>
    )
}