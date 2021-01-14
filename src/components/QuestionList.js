import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] =useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    // .then((questions) => {
    //   console.log(questions)
    // });
    .then((questions) => setQuestions(questions))
  }, []);

  //console.log(questions)

  function handleDelete(id){ //DELETE

    console.log(id)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => {
      const updated = questions.filter((q) => q.id !== id);
      setQuestions(updated)
    })

  }

  function handleAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestions(updatedQuestions);
      });
  }

  const questionsMapped = questions.map((quest) => (
    <QuestionItem 
    key={quest.id}
    question={quest}
    handleDelete={handleDelete}
    handleAnswer={handleAnswer}
    />
  ))


  return (
    <section>
      <h1>Quiz Questions</h1>
      {/* <h3>asdf</h3> */}
      <ul>{questionsMapped}</ul>
    </section>
  );
}

export default QuestionList;
