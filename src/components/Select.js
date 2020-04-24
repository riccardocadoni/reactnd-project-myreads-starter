import React from "react";
//api
import * as BooksAPI from "../BooksAPI";

/**
 * @description component that handle the select
 * @param {Object} book
 * @param {function} setRefresh if set to true triggers the refresh of the main page,to update the books position
 * @param {string} shelf name of the shelf
 */

const Select = ({ book, setRefresh, shelf }) => {
  /**
   * @description function that changes the position of the book in the database, according to the user's choice
   */
  const handleShelfChange = (e) => {
    BooksAPI.update(book, e.target.value).then(() => {
      setRefresh((prev) => !prev);
    });
  };
  return (
    <div className="book-shelf-changer">
      {/* if the shelf string is not defined than the book has a shelf property */}
      <select defaultValue={shelf || book.shelf} onChange={handleShelfChange}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read" defaultValue>
          Read
        </option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default Select;
