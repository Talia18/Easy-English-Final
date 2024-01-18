import { useEffect } from "react";
import { shuffle } from "../../utils/shuffle";
import { useSiteContext } from "../../context/siteContext";

function StructureQuestionMedium({ question }) {
  const { allQuestions, answers, setAnswers } = useSiteContext();

  const handleChange = (event) => {
    const selectedQuestion = allQuestions.filter(
      (elem) => elem._id === question._id
    );
    const selectedOption = selectedQuestion[0].options.filter(
      (elem) => elem.title === event.target.value
    );
    const correctStatus = selectedOption[0].correct;

    let newAnswers = [...answers];
    let questionExist = newAnswers.filter((q) => q._id === question._id);

    if (questionExist.length !== 0) {
      newAnswers = newAnswers.map((answer) => {
        if (answer._id === question._id) {
          return {
            ...answer,
            answer: event.target.value,
            correct: correctStatus,
          };
        } else {
          return answer;
        }
      });
    } else {
      newAnswers.push({
        _id: question._id,
        answer: event.target.value,
        correct: correctStatus,
      });
    }
    setAnswers(newAnswers);
  };

  let optionsArray = question.options;

  useEffect(() => {
    shuffle(optionsArray);
  }, []);

  return (
    <div
      className="form-check"
      style={{
        border: "5px solid rgb(77, 77, 51)",
        width: "auto",
        height: "auto",
      }}
    >
      <p className="pt-2 pe-5">{question.question}</p>

      {optionsArray.map((option, index) => (
        <div key={`qa${index}`} className="form-group">
          <input
            type="radio"
            name="questionSet"
            value={option.title}
            id={`option_${index + 1}`}
            onChange={handleChange}
            checked={
              answers.filter((q) => q._id === question._id)[0]?.answer ===
              option.title
                ? true
                : false
            }
          />
          <label className="ps-2" htmlFor={`option_${index + 1}`}>
            {option.title}
          </label>
        </div>
      ))}
    </div>
  );
}

export default StructureQuestionMedium;
