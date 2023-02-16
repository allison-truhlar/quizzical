import React from "react"
import QuizQuestion from "./QuizQuestion"
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
                    console.log(currentCorrectAnswer)
                    return question.allAnswers.map(answer =>{
                        const answerId = nanoid()
                        const isCorrectAnswer = (answer==currentCorrectAnswer ? true : false)
                        return({
                            answerId:answerId,
                            answer: answer,
                            isCorrectAnswer: isCorrectAnswer,
                            isSelected:false
                        })
                    })
                })
                setQuizAnswers(answerData)
                console.log(answerData)
                           
            })
            // .then(console.log(quizData))
      },[])

   
    //   const quizAnswerElements = quizAnswers.map(answer => {
    //     return(
    //         <QuizAnswer
    //             key={answer.id}
    //             id={answer.id}
    //             answers = {answer.allAnswers}
    //             correctAnswer = {answer.correct_answer}
    //             isSelected = {answer.isSelected}
    //         />
    //     )
    // })

    const quizElements = quizData.map(quiz => {
        return (
            <div>
                <QuizQuestion
                    key = {quiz.questionId}
                    question = {quiz.question}
                    answers = {quiz.allAnswers}
                    correctAnswer = {quiz.correct_answer}
                />
                {/* {quizAnswerElements} */}
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