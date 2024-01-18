import { createContext, useContext, useEffect, useState } from "react";
import usersService from "../services/usersService";
import httpService from "../services/httpService";
import { setTokenHeader } from "../services/usersService";

const fn_error_context_must_be_used = () => {
  throw new Error(
    "must use authContext provider for consumer to work properly"
  );
};

export const siteContext = createContext({
  logout: fn_error_context_must_be_used,
  login: fn_error_context_must_be_used,
  signUp: fn_error_context_must_be_used,
  user: null,
  allQuestions: null,
  setAllQuestions: fn_error_context_must_be_used,
});
siteContext.displayName = "siteContext";

export const SiteContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const [allQuestions, setAllQuestions] = useState([]);

  const [answers, setAnswers] = useState([]);

  setTokenHeader();

  useEffect(() => {
    getMe();
  }, []);

  async function getMe() {
    if (localStorage.getItem("token")) {
      try {
        const me = await usersService.getMyself();
        setUser(me.data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function getAllQuestions(level = null) {
    try {
      const questions = await httpService
        .get("/questions")
        .then((response) => response.data);
      let filteredQuestions;
      if (level === null) {
        filteredQuestions = questions;
      } else {
        filteredQuestions = questions.filter(
          (question) => question.levelDescription === level
        );
      }
      setAllQuestions(filteredQuestions);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  async function signUp(newUser) {
    try {
      const veryNewUser = await usersService.createUser(newUser);
      setUser(veryNewUser);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  const login = async (credentials) => {
    const response = await usersService.loginUser(credentials);

    localStorage.setItem("token", response.data.token);
    const myUser = await httpService
      .get("/users/me", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((response) => response.data);
    setUser(myUser);
    return response;
  };

  const logout = () => {
    usersService.logout();
    setUser("");
  };

  return (
    <siteContext.Provider
      value={{
        login,
        logout,
        user,
        signUp,
        allQuestions,
        setAllQuestions,
        getAllQuestions,
        answers,
        setAnswers,
      }}
    >
      {children}
    </siteContext.Provider>
  );
};

export const useSiteContext = () => {
  return useContext(siteContext);
};

export default SiteContextProvider;
