import React from "react"
import QuizQuestion from "./QuizQuestion"
import QuizAnswer from "./QuizAnswer"
import { nanoid } from 'nanoid'

export default function QuizPage(){

    const [quizQuestions, setQuizQuestions] = React.useState([])
    const [quizAnswers, setQuizAnswers] = React.useState([])
    const [hasBeenChecked, setHasBeenChecked] = React.useState(false)

    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&encode=base64")
            .then(response => response.json())
            .then(triviaData => {
                
                const questions = triviaData.results.map(result =>{
                    return atob(result.question)
                })
                

                const answers = triviaData.results.map(result => {
                    const questionId = nanoid()
                    const correctAnswer = atob(result.correct_answer)
                    const incorrect_answers = result.incorrect_answers.map(answer => atob(answer))
                    const allAnswers = [...incorrect_answers, correctAnswer]
                    const shuffledAnswers = shuffle(allAnswers)
                    
                    return shuffledAnswers.map(answer =>{
                        const answerId = nanoid()
                        const isCorrectAnswer = (answer==correctAnswer ? true : false)
                        return(
                            {
                                questionId: questionId,
                                answerId:answerId,
                                answer: answer,
                                isCorrectAnswer: isCorrectAnswer,
                                isSelected: false,
                                hasBeenChecked: false
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
      
    function selectAnswer(answerId, questionId){
        setQuizAnswers(oldQuizAnswers => oldQuizAnswers.map(answerSet => {
            const answerSetId = answerSet[0].questionId
            if (answerSetId === questionId){
                return answerSet.map(singleAnswer =>{
                    if (singleAnswer.answerId === answerId || singleAnswer.isSelected === true){
                        return {...singleAnswer, isSelected: !singleAnswer.isSelected}
                    } else {
                        return singleAnswer
                    } 
                })
            } else {
                return answerSet
            }
            
        }))
    }

    function checkAnswers(){
        setHasBeenChecked(oldHasBeenChecked => !oldHasBeenChecked)
    }

    function countCorrectAnswers(){
        const initialValue = 0
        const correctSelections = quizAnswers.map(answerSet => {
            return answerSet.filter(answer => answer.isCorrectAnswer && answer.isSelected).length
        })
        return correctSelections.reduce((accumulator, currentValue)=>accumulator + currentValue, initialValue)
    }


    const quizElements = quizQuestions.map((question, index) => {
        const correspondingAnswerSet = quizAnswers[index]
        const quizAnswerElements = correspondingAnswerSet.map(answer => {
            return(
                <QuizAnswer
                    key={answer.answerId}
                    questionId={answer.questionId}
                    answerId={answer.answerId}
                    answer = {answer.answer}
                    isCorrectAnswer = {answer.isCorrectAnswer}
                    isSelected = {answer.isSelected}
                    hasBeenChecked = {hasBeenChecked}
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
            <button className="quizPage-btn" onClick={checkAnswers}>Check answers</button>
        </div>
    )
 
}