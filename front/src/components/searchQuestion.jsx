import { useEffect, useState } from "react";
import { useSiteContext } from "../context/siteContext";

function SearchQuestion() {
  const { allQuestions, getAllQuestions } = useSiteContext();

  const [userWord, setUserWord] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAllQuestions();
  }, []);

  function handleSearch() {
    let tempSearchArr = allQuestions.filter(
      (question) => Number(question.tags.search(userWord.toLowerCase())) >= 0
    );

    setSearchResults(tempSearchArr);
  }
  return (
    <>
      <div className="d-flex flex-column text-center justify-content-center mt-4 mb-1">
        <h3>Welcome to "Search Questions"</h3>
        <p>Here in this page you can search for any question in our storage.</p>
        <p>
          Please insert a word you remember from any question and see it down
          below.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="rounded-4 me-1"
            style={{ padding: "5px" }}
            type="text"
            onChange={(event) => setUserWord(event.target.value)}
            value={userWord}
          />
          <button className="btn btn-info" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
      <div className="d-flex flex-column text-center justify-content-center mt-4">
        {searchResults.length ? (
          searchResults.map((elem, index) => {
            return (
              <div key={index} className="mt-2">
                {elem.question}
              </div>
            );
          })
        ) : (
          <p>No results found..</p>
        )}
      </div>
    </>
  );
}

export default SearchQuestion;
