import React from "react";
//components
import Book from "./Book";

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
