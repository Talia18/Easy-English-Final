function QuestionSelect({ currentQuestion, setCurrentQuestion, index }) {
  const STYLE_WIDTH = "150px";
  const STYLE_HEIGHT = "50px";

  return (
    <>
      <div
        style={{
          width: STYLE_WIDTH,
          height: STYLE_HEIGHT,
          backgroundColor:
            currentQuestion === index + 1 ? "lightgreen" : "white",
          borderStyle: "solid",
          borderWidth: "2px 2px 2px 2px",
          padding: "12px",
          cursor: "pointer",
          borderColor: "black",
          color: "black",
        }}
        onClick={() => setCurrentQuestion(index + 1)}
      >
        {index + 1}
      </div>
    </>
  );
}

export default QuestionSelect;
