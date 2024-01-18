import PageHeader from "./common/pageHeader";
import CardForAll from "./cardForAll";
import { NavLink } from "react-router-dom";

const Home = () => {
  const HEADER_DESCRIPTION =
    "Welcome to our website, Here you can practice your english wisely.";

  return (
    <>
      <PageHeader
        title={<div>EasyEnglish</div>}
        description={HEADER_DESCRIPTION}
      />

      <div className="d-flex justify-content-center">
        <NavLink className="nav-link" aria-current="page" to="lesson">
          <button className="letsBeginButton">Let's Begin !</button>
        </NavLink>
      </div>

      <h3
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "white",
          marginTop: "70px",
        }}
      >
        People say about us:
      </h3>

      <div className="row d-flex flex-wrap justify-content-around gap-3 mt-2 px-4">
        <CardForAll
          img={"./images/man.jpg"}
          name={"Avi"}
          description={"It really helped me with my english!"}
          stars={
            <>
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-half" style={{ color: "gold" }} />
            </>
          }
        />

        <CardForAll
          img={"./images/bearPanda.jpg"}
          name={"Tal"}
          description={"I recommend!!!"}
          stars={
            <>
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
            </>
          }
        />

        <CardForAll
          img={"./images/oldWoman.jpg"}
          name={"Oriya"}
          description={"It improved my english very quickly."}
          stars={
            <>
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star" style={{ color: "gold" }} />
            </>
          }
        />

        <CardForAll
          img={"./images/flowers.jpg"}
          name={"Sahar"}
          description={"Nice website :)"}
          stars={
            <>
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-half" style={{ color: "gold" }} />
              <i className="bi bi-star" style={{ color: "gold" }} />
            </>
          }
        />

        <CardForAll
          img={"./images/car.jpg"}
          name={"Ben"}
          description={"I recommended this website to all my class. WOW!"}
          stars={
            <>
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
            </>
          }
        />

        <CardForAll
          img={"./images/woman.jpg"}
          name={"Tamar"}
          description={"The site is very useful. Highly recommend."}
          stars={
            <>
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star-fill" style={{ color: "gold" }} />
              <i className="bi bi-star" style={{ color: "gold" }} />
            </>
          }
        />
      </div>
    </>
  );
};

export default Home;
