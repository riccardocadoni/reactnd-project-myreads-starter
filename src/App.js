import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
//style
import "./App.css";
//components
import Header from "./components/Header";
import Bookshelf from "./components/Bookshelf";

const BooksApp = () => {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [currentlyShelf, setCurrentlyShelf] = useState([]);
  const [wantShelf, setWantShelf] = useState([]);
  const [readShelf, setReadShelf] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let readArr = [];
    let currArr = [];
    let wantArr = [];
    BooksAPI.getAll().then((res) => {
      res.map((book) => {
        book.shelf === "read" && readArr.push(book);
        book.shelf === "currentlyReading" && currArr.push(book);
        book.shelf === "wantToRead" && wantArr.push(book);
      });
      setReadShelf(readArr);
      setWantShelf(wantArr);
      setCurrentlyShelf(currArr);
    });
  }, [refresh]);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <button
              className="close-search"
              onClick={() => setShowSearchPage(false)}
            >
              Close
            </button>
            <div className="search-books-input-wrapper">
              {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
              <input type="text" placeholder="Search by title or author" />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Header></Header>
          <div className="list-books-content">
            <div>
              <Bookshelf
                title="Currently Reading"
                books={currentlyShelf}
                setRefresh={setRefresh}
              ></Bookshelf>
              <Bookshelf
                title="Want To Read"
                books={wantShelf}
                setRefresh={setRefresh}
              ></Bookshelf>
              <Bookshelf
                title="Read"
                books={readShelf}
                setRefresh={setRefresh}
              ></Bookshelf>
            </div>
          </div>
          <div className="open-search">
            <button onClick={() => setShowSearchPage(true)}>Add a book</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksApp;
