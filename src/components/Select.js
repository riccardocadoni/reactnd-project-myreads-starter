import React from "react";
//api
import * as BooksAPI from "../BooksAPI";

const Select = ({ book, setRefresh }) => {
  const handleShelfChange = (e) => {
    console.log("loading..");
    BooksAPI.update(book, e.target.value).then(() => {
      setRefresh((prev) => !prev);
      console.log("end loading");
    });
  };

  return (
    <div className="book-shelf-changer">
      <select defaultValue={book.shelf} onChange={handleShelfChange}>
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
