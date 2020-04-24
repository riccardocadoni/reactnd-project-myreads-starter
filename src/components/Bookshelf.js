import React from "react";
//components
import Book from "./Book";

/**
 * @description component that renders the shelf
 * @param {string} title title of the shelf
 * @param {Array} books books in the shelf
 * @param {function} setRefresh if set to true triggers the refresh of the main page,to update the books position
 */
const BookShelf = ({ title, books, setRefresh }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return <Book book={book} setRefresh={setRefresh} key={book.id} />;
          })}
        </ol>
      </div>
    </div>
  );
};
export default BookShelf;
