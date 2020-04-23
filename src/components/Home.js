import React, { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";
//style
import "../App.css";
//components
import Header from "./Header";
import Bookshelf from "./Bookshelf";

const Home = () => {
  const [currentlyShelf, setCurrentlyShelf] = useState([]);
  const [wantShelf, setWantShelf] = useState([]);
  const [readShelf, setReadShelf] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(
    () => {
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
    },
    [refresh]
  );

  return (
    <div className="list-books">
      <Header />
      <div className="list-books-content">
        <div>
          <Bookshelf
            title="Currently Reading"
            books={currentlyShelf}
            setRefresh={setRefresh}
          />
          <Bookshelf
            title="Want To Read"
            books={wantShelf}
            setRefresh={setRefresh}
          />
          <Bookshelf title="Read" books={readShelf} setRefresh={setRefresh} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
