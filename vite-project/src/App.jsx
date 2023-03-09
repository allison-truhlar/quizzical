import React from "react"
import LandingPage from "./Components/LandingPage"
import QuizPage from "./Components/QuizPage"

function App() {

  //Declare "startQuiz" state. When false, LandingPage component is rendered. When true, QuizPage component is rendered
  const [startQuiz, setStartQuiz] = React.useState(false)

  //Function to toggle the value of startQuiz state between true and false  
  function toggleStartQuiz(){
    setStartQuiz(prevStartQuiz => !prevStartQuiz)
  }

  return(
    <main>
      <div className="app-container">
        {startQuiz ? 
          <QuizPage toggleStartQuiz={toggleStartQuiz}/> : 
          <LandingPage toggleStartQuiz={toggleStartQuiz} />
        }
      </div>
    </main>
  )
}

export default App
