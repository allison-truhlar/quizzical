import React from "react"
import QuizQuestion from "./QuizQuestion"
import QuizAnswer from "./QuizAnswer"
import { nanoid } from 'nanoid'

export default function QuizPage(){

    const [quizQuestions, setQuizQuestions] = React.useState([])
    const [quizAnswers, setQuizAnswers] = React.useState([])

    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&encode=base64")
            .then(response => response.json())
            .then(triviaData => {
                
                const questions = triviaData.results.map(result =>{
                    return atob(result.question)
                })

                const answers = triviaData.results.map(result => {
                    const correctAnswer = atob(result.correct_answer)
                    const incorrect_answers = result.incorrect_answers.map(answer => atob(answer))
                    const allAnswers = [...incorrect_answers, correctAnswer]
                    const shuffledAnswers = shuffle(allAnswers)
                    
                    return shuffledAnswers.map(answer =>{
                        const answerId = nanoid()
                        const isCorrectAnswer = (answer==correctAnswer ? true : false)
                        return(
                            {
                                id:answerId,
                                answer: answer,
                                isCorrectAnswer: isCorrectAnswer,
                                isSelected:false
                            }
                        )
                    })   
                })
                setQuizQuestions(questions)
                setQuizAnswers(answers)
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
      
    function selectAnswer(id){
        setQuizAnswers(oldQuizAnswers => oldQuizAnswers.map(answerSet => {
            return answerSet.map(singleAnswer =>{
                return singleAnswer.id === id ? {...singleAnswer, isSelected: !singleAnswer.isSelected} : singleAnswer
            })
        }))
    }

    const quizElements = quizQuestions.map((question, index) => {
        const correspondingAnswerSet = quizAnswers[index]
        const quizAnswerElements = correspondingAnswerSet.map(answer => {
            console.log(answer.isSelected)
            return(
                <QuizAnswer
                    key={answer.id}
                    id={answer.id}
                    answer = {answer.answer}
                    isCorrectAnswer = {answer.isCorrectAnswer}
                    isSelected = {answer.isSelected}
                    selectAnswer = {selectAnswer}
                />)
        })
        
        return (
            <div className="quizElement-container">
                <QuizQuestion
                    key = {nanoid()}
                    question = {question}
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