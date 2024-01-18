import { NavLink } from "react-router-dom";
import { useSiteContext } from "../context/siteContext";

export const FooterNav = () => {
  const { user } = useSiteContext();

  return (
    <div className="container">
      <nav className="navbar">
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex flex-row justify-content-center align-content-center gap-4">
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
            </>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </div>
  );
};
