import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';
import Book from './Book';

export default class Search extends Component {
  state = {
    query: '',
    searchResult: [],
  };
  handleQuery = (e) => {
    this.setState({ query: e.target.value.trim() }, () => {
      let query = this.state.query;
      if (query !== '') {
        search(query).then((res) => {
          if (Array.isArray(res)) {
            console.log(res);
            this.setState({ searchResult: res });
          } else {
            console.error('invalid search query', res.items);
            this.setState({ searchResult: [] });
          }
        });
      } else {
        this.setState({ searchResult: [] });
      }
    });
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search"></Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={this.handleQuery}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResult.map((book) => {
              return (
                <li key={book.id}>
                  <Book book={book} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}
