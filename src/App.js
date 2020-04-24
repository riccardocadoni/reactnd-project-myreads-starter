import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
//components
import Home from "./components/Home";
import Search from "./components/Search";

/**
 * @description Main coponent
 *
 */
const BooksApp = () => {
  const [refresh, setRefresh] = useState(false);
  const [currentlyShelf, setCurrentlyShelf] = useState([]);
  const [wantShelf, setWantShelf] = useState([]);
  const [readShelf, setReadShelf] = useState([]);

  /**
   * @description gets the list of my books and save them in the three shelves state
   */
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
    <Router>
      <Route
        key={"/"}
        path={"/"}
        exact={true}
        component={() => (
          <Home
            refresh={refresh}
            setRefresh={setRefresh}
            readShelf={readShelf}
            wantShelf={wantShelf}
            currentlyShelf={currentlyShelf}
          />
        )}
      />
      <Route
        key={"/search"}
        path={"/search"}
        exact={true}
        component={() => (
          <Search
            setRefresh={setRefresh}
            readShelf={readShelf}
            wantShelf={wantShelf}
            currentlyShelf={currentlyShelf}
          />
        )}
      />
    </Router>
  );
};
export default BooksApp;
