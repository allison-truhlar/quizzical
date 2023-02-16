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
                    
                    const questionAndAnswerData = allAnswers.map(answer =>{
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
                    console.log(questionAndAnswerData)

                    return(
                        {
                            question: question,
                            answers: [questionAndAnswerData]
                        }
                    )
                })
                setQuizData(questionData)
                console.log(quizData)
            })
        },[])

            //         return({
            //             ...result,
            //             questionId: nanoid(),
            //             question: atob(result.question),
            //             allAnswers: [...decodedIncorrectAnswers, atob(result.correct_answer)],
            //             correctAnswer:atob(result.correct_answer)
            //         })
            //     })
                

                
            //     setQuizAnswers(answerData)
            //     console.log(answerData)
                           
            // })
            // .then(console.log(quizData))
      

       
//     const quizElements = quizData.map((quiz, index) => {
//         const matchingQuizAnswers = quizAnswers[index]
//         console.log(matchingQuizAnswers)
//         const quizAnswerElements = matchingQuizAnswers.map(answer => {
//             return(
//                 <QuizAnswer
//                     key={answer.answerId}
//                     id={answer.answerId}
//                     answer = {answer.answer}
//                     isCorrectAnswer = {answer.isCorrectAnswer}
//                     isSelected = {answer.isSelected}
//                 />)
//         })
        
//         const shuffledAnswerElements = shuffle(quizAnswerElements)

//         return (
//             <div className="quizElement-container">
//                 <QuizQuestion
//                     key = {quiz.questionId}
//                     question = {quiz.question}
//                 />
//                 <div className="quizAnswer-container">
//                     {shuffledAnswerElements}
//                 </div>
//             </div>
//         )
//     })

//     function shuffle(array){
//         for (let i=0; i<array.length; i++){
//             const randomIndex = Math.floor(Math.random() * array.length)
//             const currentArrayItem = array[i]
//             // Replace the item at the current index location with the item from the random index location
//             array[i] = array[randomIndex]
//             // Move currentArrayItem to the random index location
//             array[randomIndex] = currentArrayItem
//         }
//         return array
//     }

    

//     return(
//         <div className="quizPage-container">
//             {quizElements}
//             <button className="quizPage-btn">Check answers</button>
//         </div>
//     )
return(<div></div>)    
}