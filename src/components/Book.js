import React from 'react';
import { update } from '../BooksAPI';

export default function Book(props) {
  const handleDropdown = (e) => {
    let getValue = e.target.value;
    console.log(e.target.value, props.book.id);
    getValue !== 'none' &&
      update(props.book, e.target.value).then((res) => console.log(res));
  };
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.book?.imageLinks?.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={(e) => handleDropdown(e)}>
            <option value="move" disabled selected>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors}</div>
    </div>
  );
}
