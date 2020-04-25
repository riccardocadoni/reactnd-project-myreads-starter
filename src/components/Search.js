import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
//components
import Book from "./Book";

/**
 * @description component that handle the search of books
 * @param {function} setRefresh if set to true triggers the refresh of the main page,to update the books position
 * @param {Array} currentlyShelf books in this shelf
 * @param {Array} wantShelf books in this shelf
 * @param {Array} readShelf books in this shelf
 */
const Search = ({ setRefresh, currentlyShelf, wantShelf, readShelf }) => {
  const [textInput, setTextInput] = useState("");
  const [books, setBooks] = useState([]);
  const [queryErr, setQueryErr] = useState(false);

  /**
   * @description function to empty the books state if the text in the search box is empty
   */
  if (textInput === "" && books.length) {
    setBooks([]);
    setQueryErr(false);
  }
  /**
   * @description function that makes the api call to search books
   */
  useEffect(
    () => {
      textInput &&
        BooksAPI.search(textInput)
          .then((res) => {
            //if the query gets no results
            if (res.error) setQueryErr(true);
            else {
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
            {books.map((book) => {
              /**
               * check if the book is currently in one of the personal shelf,
               * if is the case,it adds the shelf property
               */
              if (readShelf.filter((b) => b.id === book.id).length)
                book.shelf = "read";
              if (currentlyShelf.filter((b) => b.id === book.id).length) {
                book.shelf = "currentlyReading";
              }
              if (wantShelf.filter((b) => b.id === book.id).length)
                book.shelf = "wantToRead";
              return <Book book={book} key={book.id} setRefresh={setRefresh} />;
            })}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Search;
