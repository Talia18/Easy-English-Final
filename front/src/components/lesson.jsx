import PageHeader from "./common/pageHeader";
import { Link } from "react-router-dom";

function Lesson() {
  const LESSON_DESCRIPTION =
    "Here in this page you can practice your english by choosing your difficulty.";

  return (
    <>
      <PageHeader
        title={
          <img
            src="./images/EasyEnglish.jpeg"
            alt="Easy English"
            style={{ width: "120px", height: "120px" }}
          />
        }
        description={LESSON_DESCRIPTION}
      />
      <div className="d-flex justify-content-center">
        <p>Please choose your difficulty level:</p>
      </div>
      <div className="d-flex justify-content-center">
        <Link to="/myQuestionsEasy">
          <button className="btn btn-success m-2 p-3 fw-bold">Easy</button>
        </Link>
        <Link to="/myQuestionsMedium">
          <button className="btn btn-warning m-2 p-3 fw-bold">Medium</button>
        </Link>
        <Link to="/myQuestionsHard">
          <button className="btn btn-danger m-2 p-3 fw-bold">Hard</button>
        </Link>
      </div>
    </>
  );
}

export default Lesson;
