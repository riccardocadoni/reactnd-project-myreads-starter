import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
//components
import Book from "./Book";

const Search = () => {
  const [textInput, setTextInput] = useState("");
  const [books, setBooks] = useState([]);
  const [queryErr, setQueryErr] = useState(false);

  useEffect(
    () => {
      if (textInput === "") setBooks([]);
      textInput &&
        BooksAPI.search(textInput)
          .then((res) => {
            if (res.error) setQueryErr(true);
            if (Array.isArray(res)) {
              setBooks(res);
              if (queryErr) setQueryErr(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    [textInput]
  );

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>
      </div>
      {queryErr ? (
        <div className="search-books-results">
          <h2>No results for this query :( </h2>
        </div>
      ) : (
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <Book book={book} key={book.id} />
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Search;

{
  /*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */
}
