import React from 'react';

export default function Header(props) {
  return (
    <div>
      <div className="list-books-title">
        <h1>{props.title}</h1>
      </div>
    </div>
  );
}
