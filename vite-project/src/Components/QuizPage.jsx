import React from "react"
import QuizQuestion from "./QuizQuestion"
import QuizAnswer from "./QuizAnswer"
import { nanoid } from 'nanoid'
import { Base64 } from 'js-base64'

export default function QuizPage(props){

    //Declare state    
    const [quizQuestions, setQuizQuestions] = React.useState([])
    const [quizAnswers, setQuizAnswers] = React.useState([])
    const [isComplete, setIsComplete] = React.useState(false)
    const [hasBeenChecked, setHasBeenChecked] = React.useState(false)

    //Use effect that is run on the initial render of QuizPage. 
    React.useEffect(()=>{
        //Call to the Open Trivia Database API
        fetch("https://opentdb.com/api.php?amount=5&encode=base64")
            .then(response => response.json())
            .then(triviaData => {
                
                //Collect data from the response to assign to quizQuestions state
                // const questions = triviaData.results.map(result =>{
                //     return Base64.decode(result.question)
                // })
                
                //Collect data from the response to assign to quizAnswers state
                let questionsAndAnswers = []
                for (let i=0; i<triviaData.results.length; i++){
                    let currentResult = triviaData.results[i]
                    let question = Base64.decode(currentResult.question)
                    let correctAnswer = Base64.decode(currentResult.correct_answer)
                    let incorrectAnswers = currentResult.incorrect_answers.map(answer => Base64.decode(answer))
                    let allAnswers = [...incorrectAnswers, correctAnswer]
                    let shuffledAnswers = shuffle(allAnswers)
                    questionsAndAnswers[i] = (
                        {
                            question: question,
                            correctAnswer: correctAnswer,
                            shuffledAnswers: shuffledAnswers
                        }
                    )
                }
                console.log(questionsAndAnswers)

                // const answers = triviaData.results.map(result => {
                //     const questionId = nanoid()
                //     const correctAnswer = Base64.decode(result.correct_answer)
                //     const incorrect_answers = result.incorrect_answers.map(answer => Base64.decode(answer))
                //     const allAnswers = [...incorrect_answers, correctAnswer]
                //     const shuffledAnswers = shuffle(allAnswers)

                //     return shuffledAnswers.map(answer =>{
                //         const answerId = nanoid()
                //         const isCorrectAnswer = (answer==correctAnswer ? true : false)
                //         return(
                //             {
                //                 questionId: questionId,
                //                 answerId:answerId,
                //                 answer: answer,
                //                 isCorrectAnswer: isCorrectAnswer,
                //                 isSelected: false,
                //                 hasBeenChecked: {hasBeenChecked}
                //             }
                //         )
                //     })   
                // })
                // setQuizQuestions(questions)
                // setQuizAnswers(answers)
            })
    },[])

    //Use effect that runs everytime quizAnswers are updated to see if an answer has been selected for each question
    //I.e., that the quiz is complete
    React.useEffect(() =>{
       if (countAnswers(false) === 5){
        setIsComplete(true)
       }
    },[quizAnswers])

    //Function to shuffle the answers provided in the API response so that the correct answer is in a random location    
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

    //Function that can either count how many answers are selected for each question, or how many CORRECT answers are selected for each question
    //Which is counted is determined by the Boolean parameter "onlyCorrect" - if true, then CORRECT answers are counted. If false, then all answers per question are counted
    function countAnswers(onlyCorrect){
        const initialValue = 0
        const answersPerQuestion = quizAnswers.map(answerSet => {
            if(onlyCorrect){
                return answerSet.filter(answer => answer.isCorrectAnswer && answer.isSelected).length
            } else{
                return answerSet.filter(answer => answer.isSelected).length
            }
        })
        return answersPerQuestion.reduce((accumulator, currentValue)=>accumulator + currentValue, initialValue)
    }
     
    //Function to update quizAnswers to reflect which answers are selected by the player.
    //Only one answer per question is permitted to be selected
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

    //Function to update the hasBeenChecked state to true when the "check answer" button is clicked
    function checkAnswers(){
        if (!hasBeenChecked){
            setHasBeenChecked(oldHasBeenChecked => !oldHasBeenChecked)
        }          
    }

    //Create quizElements from corresponding QuizQuestion and QuizAnswer components
    const quizElements = quizQuestions.map((question, index) => {
        const correspondingAnswerSet = quizAnswers[index]
        //Create the quizAnswerElements for all the answers that correspond to the current question 
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
        //Each instance of quizElements consists of a QuizQuestion component with the matching quiz answer elements nested beneath
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
            {/* Only show the answer count if hasBeenChecked is set to true */}
            <div className="quizPage-footer">
                {hasBeenChecked && 
                    <p className="quizPage-answerCount">
                        You scored {countAnswers(true)}/5 correct answers
                    </p>
                }
                {/* The check answer button only displays when hasBeenChecked is false and only works when isComple is true. When hasBeenChecked is true, the button displays "New Game", and clicking it toggles the startQuiz state so that the LandingPage component displays again */}
                <button 
                    className="quizPage-btn" 
                    onClick={hasBeenChecked ? props.toggleStartQuiz : checkAnswers}
                    disabled={isComplete ? false : true}
                >
                    {hasBeenChecked ? "New Game" : "Check Answers"}
                </button>
            </div>
        </div>
    )
 
}