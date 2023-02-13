import React from "react"
import LandingPage from "./Components/LandingPage"
import QuizPage from "./Components/QuizPage"

function App() {

  const [startQuiz, setStartQuiz] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])

  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5&encode=base64")
      .then(response => response.json())
      .then(data => {
        setQuizData(data.results)
        console.log(quizData)
      })
  },[startQuiz])

  function toggleStartQuiz(){
    setStartQuiz(prevStartQuiz => !prevStartQuiz)
  }

  return(
    <main>
      <div className="app-container">
        {startQuiz ? 
          <QuizPage quizData={quizData}/> : 
          <LandingPage toggleStartQuiz={toggleStartQuiz} />
        }
      </div>
    </main>
  )
}

export default App
