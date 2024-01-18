import { useEffect, useState } from "react";
import { useSiteContext } from "../../context/siteContext";

function StructureQuestionHard({ question }) {
  const { allQuestions, answers, setAnswers } = useSiteContext();

  const [userAnswer, setUserAnswer] = useState("");

  // Getting previous answer
  useEffect(() => {
    const selectedAnswer = answers.filter((q) => q._id === question._id);

    setUserAnswer(selectedAnswer[0]?.answer || "");
  }, []);

  // Handle change in userAnswer
  useEffect(() => {
    const selectedQuestion = allQuestions.filter(
      (q) => q._id === question._id
    )[0];
    const selectedCorrectAnswer = selectedQuestion.options[0].title;

    let newAnswers = [...answers];
    let questionExist = newAnswers.filter((q) => q._id === question._id);

    let correctStatus =
      userAnswer.toLowerCase() === selectedCorrectAnswer ? true : false;

    if (questionExist.length !== 0) {
      newAnswers = newAnswers.map((answer) => {
        if (answer._id === question._id) {
          return {
            ...answer,
            answer: userAnswer,
            correct: correctStatus,
          };
        } else {
          return answer;
        }
      });
    } else {
      newAnswers.push({
        _id: question._id,
        answer: userAnswer,
        correct: correctStatus,
      });
    }
    setAnswers(newAnswers);
  }, [userAnswer]);

  return (
    <div
      style={{
        border: "5px solid rgb(77, 77, 51)",
        width: "auto",
        height: "250px",
        padding: "20px",
      }}>
      <p className="pt-2">{question.question}</p>

      <div className="d-flex justify-content-center">
        <input
          className="mt-5"
          type="text"
          id={question._id}
          onChange={(e) => setUserAnswer(e.target.value)}
          value={userAnswer}
        />
      </div>
    </div>
  );
}

export default StructureQuestionHard;
