import { useEffect, useState } from "react";
import userService from "../services/usersService";

function Score() {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [allAnswers, setAllAnswers] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [usersHighestPoints, setUsersHighestPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  async function myQuestionsCalculation() {
    const myStats = await userService.getMyself();

    let myCorrectAnswers = myStats.data.questions.filter(
      (q) => q.correct === true
    ).length;

    let myAllAnswers = myStats.data.questions.length;

    let myPercentage = (myCorrectAnswers / myAllAnswers) * 100;

    setCorrectAnswers(myCorrectAnswers);
    setAllAnswers(myAllAnswers);
    setPercentage(myPercentage);
  }

  async function usersCalculation() {
    let allUsers = await userService.getAllUsers();

    let leaderboardUsers = [];
    for (let i = 0; i < allUsers.data.length; i++) {
      let user = {};
      user.name = allUsers.data[i].name;
      let rightAnswers = allUsers.data[i].questions.filter(
        (q) => q.correct === true
      ).length;
      user.rightAnswers = rightAnswers;
      leaderboardUsers.push(user);
    }

    let finalLeaderboard = leaderboardUsers.sort(
      (a, b) => b.rightAnswers - a.rightAnswers
    );

    setUsersHighestPoints([...usersHighestPoints, ...finalLeaderboard]);

    setLoading(false);
  }

  useEffect(() => {
    myQuestionsCalculation();
    usersCalculation();
  }, []);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-around">
            <p className="scoreHeader">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "35px" }}
              >
                trophy
              </span>
              Score
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "35px" }}
              >
                trophy
              </span>
            </p>
          </div>

          <div className="d-flex justify-content-evenly">
            <div
              className="myDataDiv"
              style={{
                border: "3px solid black",
                width: "300px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h4 style={{ marginTop: "20px" }}>
                My correct answers: <p>{correctAnswers}</p>
              </h4>
              <h4>
                My all answers: <p>{allAnswers}</p>
              </h4>
              <h4>
                Percentage:{" "}
                <p>
                  {isNaN(percentage) || isNaN(parseFloat(percentage))
                    ? 0
                    : parseFloat(percentage).toFixed(2)}
                  %
                </p>
              </h4>
            </div>
            <lord-icon
              src="https://cdn.lordicon.com/jdngjjzg.json"
              trigger="hover"
              style={{ width: "200px", height: "200px", marginTop: "50px" }}
            ></lord-icon>
            <div
              className="leaderboardDiv"
              style={{
                border: "3px solid black",
                width: "300px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3 className="leaderboard">Leaderboard</h3>
              <h4 className="m-2">
                <span
                  className="material-symbols-outlined"
                  style={{ color: "gold" }}
                >
                  workspace_premium
                </span>
                First Place - {usersHighestPoints[0].name}
              </h4>
              <h4 className="m-2">
                <span
                  className="material-symbols-outlined"
                  style={{ color: "silver" }}
                >
                  workspace_premium
                </span>
                Second Place - {usersHighestPoints[1].name}
              </h4>
              <h4 className="m-2">
                <span
                  className="material-symbols-outlined"
                  style={{ color: "brown" }}
                >
                  workspace_premium
                </span>
                Third Place - {usersHighestPoints[2].name}
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Score;
