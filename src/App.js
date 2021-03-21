import React, { useState, useEffect } from "react";
import { Questionaire } from "./components";

const API_URL =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);


  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results.map((question) => 
        ({
          ...question,
          answers: [
          question.correct_answer,
          ...question.incorrect_answers
          ].sort(() => Math.random())
      }))

        setQuestions(questions);
    });
  },[]);

  const handleAnswer = (answer) => {
    // const newIndex = currentIndex + 1
    // setCurrentIndex(currentIndex + 1);
    if(!showAnswers) {
    if (answer === questions[currentIndex].correct_answer) {
      setScore(score + 1);
    }
  }

    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setShowAnswers(false);

    setCurrentIndex(currentIndex + 1);
  }

  return questions.length > 0 ? (
  <div className="container">
    {currentIndex >= questions.length ? (
    <h1 className="text-1xl text-white font-bold"> 
    Your score was {score}
    </h1>
  ) :  (
      <Questionaire
        data={questions[currentIndex]}
        showAnswers={showAnswers}
        handleAnswer={handleAnswer}
        handleNextQuestion={handleNextQuestion}
      />
  )}
    </div>
  ) : (
    <h1 className="text-2xl text-white font-bold">Loading...</h1>
  );

}

export default App;
