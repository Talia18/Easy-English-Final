import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import SignOut from "./components/signOut";
import ProtectedRoute from "./components/common/protectedRoute";
import { ToastContainer, Zoom } from "react-toastify";
import Lesson from "./components/lesson";
import QuestionsEasy from "./components/common/questionsEasy";
import Score from "./components/score";
import QuestionsMedium from "./components/common/questionsMedium";
import QuestionsHard from "./components/common/questionHard";
import SearchQuestion from "./components/searchQuestion";
import CreateEasyQuestion from "./components/createEasyQuestion";
import CreateHardQuestion from "./components/createHardQuestion";
import CreateMediumQuestion from "./components/createMediumQuestion";
import QuestionDelete from "./components/questionDelete";
import EditEasyQuestion from "./components/editEasyQuestion";
import EditHardQuestion from "./components/editHardQuestion";
import { useSiteContext } from "./context/siteContext";

function App() {
  const { user } = useSiteContext();
  return (
    <div className="vh-100 d-flex flex-column">
      <ToastContainer slide={Zoom} />

      <header>
        <Navbar />
      </header>

      <div id="innerMain" className="d-flex flex-fill flex-column">
        <div id="mainOverlay" className="p-2 flex-fill flex-column d-flex">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="about" element={<About />} />

            <Route path="sign-in" element={<SignIn redirect="/" />} />

            <Route path="sign-up" element={<SignUp redirect="/sign-in" />} />

            <Route path="sign-out" element={<SignOut redirect="/" />} />

            <Route
              path="myQuestionsEasy"
              element={
                <ProtectedRoute>
                  <QuestionsEasy />
                </ProtectedRoute>
              }
            />

            <Route
              path="myQuestionsMedium"
              element={
                <ProtectedRoute>
                  <QuestionsMedium />
                </ProtectedRoute>
              }
            />

            <Route
              path="myQuestionsHard"
              element={
                <ProtectedRoute>
                  <QuestionsHard />
                </ProtectedRoute>
              }
            />

            <Route
              path="lesson"
              element={
                user ? (
                  <ProtectedRoute>
                    <Lesson />
                  </ProtectedRoute>
                ) : (
                  <SignIn />
                )
              }
            />

            <Route
              path="score"
              element={
                <ProtectedRoute>
                  <Score />
                </ProtectedRoute>
              }
            />

            <Route
              path="searchQuestion"
              element={
                <ProtectedRoute>
                  <SearchQuestion />
                </ProtectedRoute>
              }
            />

            <Route
              path="createEasyQuestion"
              element={
                <ProtectedRoute>
                  <CreateEasyQuestion redirect="/" />
                </ProtectedRoute>
              }
            />

            <Route
              path="createMediumQuestion"
              element={
                <ProtectedRoute>
                  <CreateMediumQuestion redirect="/" />
                </ProtectedRoute>
              }
            />

            <Route
              path="createHardQuestion"
              element={
                <ProtectedRoute>
                  <CreateHardQuestion redirect="/" />
                </ProtectedRoute>
              }
            />

            <Route
              path="questions/editEasyQuestion/:id"
              element={
                <ProtectedRoute>
                  <EditEasyQuestion />
                </ProtectedRoute>
              }
            />

            <Route
              path="questions/editMediumQuestion/:id"
              element={
                <ProtectedRoute>
                  <EditEasyQuestion />
                </ProtectedRoute>
              }
            />

            <Route
              path="questions/editHardQuestion/:id"
              element={
                <ProtectedRoute>
                  <EditHardQuestion />
                </ProtectedRoute>
              }
            />

            <Route
              path="questions/delete/:id"
              element={
                <ProtectedRoute>
                  <QuestionDelete />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
