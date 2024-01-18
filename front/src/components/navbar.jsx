import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { GREY } from ".";
import { useSiteContext } from "../context/siteContext";

const Navbar = () => {
  const { user } = useSiteContext();

  const [themeMode, setThemeMode] = useState("light");
  const htmlTag = document.getElementsByTagName("html")[0];
  useEffect(() => {
    htmlTag.setAttribute("data-bs-theme", themeMode);
  }, [themeMode]);
  return (
    <nav
      style={{ backgroundColor: GREY }}
      className="navbar navbar-expand-lg navbar-light"
      aria-label="Fifth navbar example"
    >
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img
            style={{ width: "60px", height: "60px", padding: "2px" }}
            src="./images/EasyEnglish.jpeg"
            className="img-thumbnail"
            alt="Easy English"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="about">
                About
              </NavLink>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="lesson">
                    Lesson
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="score">
                    Score
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="searchQuestion"
                  >
                    Search Question
                  </NavLink>
                </li>
                {user.isAdmin && (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Create Question
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          aria-current="page"
                          to="createEasyQuestion"
                        >
                          Easy
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          aria-current="page"
                          to="createMediumQuestion"
                        >
                          Medium
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          aria-current="page"
                          to="createHardQuestion"
                        >
                          Hard
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                )}
              </>
            ) : (
              ""
            )}
          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0">
            {user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/sign-out">
                  <button className="logoutBtn">
                    <div className="signLogout">
                      <svg viewBox="0 0 512 512">
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                      </svg>
                    </div>
                    <div className="textLogout">Signout</div>
                  </button>
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-in">
                    <button className="signinBtn">
                      <div className="signSignin">
                        <svg viewBox="0 0 512 512">
                          <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                        </svg>
                      </div>

                      <div className="textSignin">Singin</div>
                    </button>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up">
                    <button className="signupBtn">
                      <div className="signSignup">
                        <svg viewBox="0 0 512 512">
                          <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                        </svg>
                      </div>

                      <div className="textSignup">Signup</div>
                    </button>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <button
            className="btn"
            onClick={() =>
              setThemeMode(themeMode === "light" ? "dark" : "light")
            }
          >
            {themeMode === "light" ? (
              <i className="bi bi-moon-stars-fill"></i>
            ) : (
              <i className="bi bi-brightness-high-fill"></i>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
