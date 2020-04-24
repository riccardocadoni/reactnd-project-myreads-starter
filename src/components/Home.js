import React from "react";
import { Link } from "react-router-dom";
//style
import "../App.css";
//components
import Header from "./Header";
import Bookshelf from "./Bookshelf";

/**
 * @description component that renders the Home page
 * @param {function} setRefresh if set to true triggers the refresh of the main page,to update the books position
 * @param {Array} currentlyShelf books in this shelf
 * @param {Array} wantShelf books in this shelf
 * @param {Array} readShelf books in this shelf
 */
const Home = ({ setRefresh, currentlyShelf, wantShelf, readShelf }) => {
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
