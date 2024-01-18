import { useEffect, useState } from "react";
import { useSiteContext } from "../../context/siteContext";
import { addScore } from "../../services/usersService";
import QuestionSelect from "./questionSelect";
import StructureQuestionEasy from "./structureQuestionEasy";
import { Link } from "react-router-dom";

function QuestionsEasy() {
  const { user, allQuestions, getAllQuestions, answers, setAnswers } =
    useSiteContext();

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [submitAll, setSubmitAll] = useState(false);

  const [options, setOptions] = useState(true);

  useEffect(() => {
    getAllQuestions("Easy");
  }, []);

  useEffect(() => {
    let allAnswers = [];
    setAnswers(allAnswers);
  }, [allQuestions]);

  async function nextQuestion() {
    if (currentQuestion === allQuestions.length) {
      for (let i = 0; i < answers.length; i++) {
        await addScore(answers[i]);
      }
      setSubmitAll(true);
    } else {
      setSubmitAll(false);
      setCurrentQuestion((questionIndex) => questionIndex + 1);
    }
  }

  function previousQuestion() {
    if (currentQuestion === 1) {
      return;
    } else {
      setSubmitAll(false);
      setCurrentQuestion((questionIndex) => questionIndex - 1);
    }
  }

  return (
    <>
      <div className="d-flex flex-row text-center justify-content-center">
        {allQuestions.map((question, index) => (
          <QuestionSelect
            key={`qs${index}`}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            index={index}
          />
        ))}
      </div>

      <div className="d-flex flex-column fs-3 p-3 m-3 align-items-center">
        {allQuestions.length > 0 && (
          <StructureQuestionEasy
            question={allQuestions[currentQuestion - 1]}
            currentQuestion={currentQuestion}
          />
        )}

        {user.isAdmin ? (
          <button
            className="btn btn-danger mt-2"
            onClick={() => setOptions(!options)}>
            Admin options
          </button>
        ) : (
          ""
        )}

        {options ? (
          ""
        ) : (
          <>
            <div className="d-flex justify-content-center">
              <div style={{ margin: "10px" }}>
                <Link
                  to={`/questions/editEasyQuestion/${
                    allQuestions[currentQuestion - 1]._id
                  }`}
                  className="card-link">
                  <span className="btn btn-outline-primary">
                    <i className="bi bi-pencil-square"></i>
                  </span>
                </Link>
              </div>
              <div style={{ margin: "10px" }}>
                <Link
                  to={`/questions/delete/${
                    allQuestions[currentQuestion - 1]._id
                  }`}
                  className="card-link">
                  <span className="btn btn-outline-danger">
                    <i className="bi bi-trash3"></i>
                  </span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success me-2"
          onClick={previousQuestion}
          disabled={currentQuestion === 1 ? "disabled" : ""}>
          Back
        </button>
        <button className="btn btn-success ms-2" onClick={nextQuestion}>
          {currentQuestion === allQuestions.length ? "Submit" : "Next"}
        </button>
      </div>
      {submitAll && (
        <div className="text-center mt-4">
          <h3>Results:</h3>
          {answers.map((ans, index) => {
            return (
              <div key={index}>{`${index + 1}. You answered: "${
                ans.answer
              }" || The answer is: ${ans.correct ? "True" : "False"}`}</div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default QuestionsEasy;
