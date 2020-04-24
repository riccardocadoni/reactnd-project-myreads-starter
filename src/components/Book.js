import React from "react";
//components
import Select from "./Select";

/**
 * @description component that renders the book
 * @param {Object} book
 * @param {function} setRefresh if set to true triggers the refresh of the main page,to update the books position
 * @param {string} shelf name of the shelf
 */
const Book = ({ book, setRefresh, shelf }) => {
  //console.log(book);
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks &&
                book.imageLinks.thumbnail})`,
            }}
          />
          <Select book={book} setRefresh={setRefresh} shelf={shelf} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
};
export default Book;
