import React from "react"
import LandingPage from "./Components/LandingPage"
import QuizPage from "./Components/QuizPage"

function App() {

  const [startQuiz, setStartQuiz] = React.useState(false)

  function toggleStartQuiz(){
    setStartQuiz(prevStartQuiz => !prevStartQuiz)
  }

  return(
    <main>
      <div className="app-container">
        {startQuiz ? 
          <QuizPage /> : 
          <LandingPage toggleStartQuiz={toggleStartQuiz} />
        }
      </div>
    </main>
  )
}

export default App
