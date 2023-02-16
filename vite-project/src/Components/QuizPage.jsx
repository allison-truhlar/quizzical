import React from "react"
import QuizQuestion from "./QuizQuestion"
import QuizAnswer from "./QuizAnswer"
import { nanoid } from 'nanoid'

export default function QuizPage(){

    const [quizData, setQuizData] = React.useState([])
    // const [quizAnswers, setQuizAnswers] = React.useState([])

    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&encode=base64")
            .then(response => response.json())
            .then(triviaData => {
                
                const questionData = triviaData.results.map(result => {
                    // console.log({...result, id:nanoid()})
                    const question = atob(result.question)
                    const correctAnswer = atob(result.correct_answer)
                    const incorrect_answers = result.incorrect_answers.map(answer => atob(answer))
                    const allAnswers = [...incorrect_answers, correctAnswer]
                    const shuffledAnswers = shuffle(allAnswers)
                    
                    const questionAndAnswerData = shuffledAnswers.map(answer =>{
                        const answerId = nanoid()
                        const isCorrectAnswer = (answer==correctAnswer ? true : false)
                        return(
                            {
                                answerId:answerId,
                                answer: answer,
                                isCorrectAnswer: isCorrectAnswer,
                                isSelected:false
                            }
                        )
                    })

                    return(
                        {
                            question: question,
                            answers: questionAndAnswerData
                        }
                    )
                })
                setQuizData(questionData)
            })
        },[])

 
    function shuffle(array){
                for (let i=0; i<array.length; i++){
                    const randomIndex = Math.floor(Math.random() * array.length)
                    const currentArrayItem = array[i]
                    // Replace the item at the current index location with the item from the random index location
                    array[i] = array[randomIndex]
                    // Move currentArrayItem to the random index location
                    array[randomIndex] = currentArrayItem
                }
                return array
    }
       
    const quizElements = quizData.map(singleQuestion => {
        const answerArray = singleQuestion.answers

        const quizAnswerElements = answerArray.map(answer => {
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
                    key = {nanoid()}
                    question = {singleQuestion.question}
                />
                <div className="quizAnswer-container">
                    {quizAnswerElements}
                </div>
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