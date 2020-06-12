import React from 'react';
import { hot } from 'react-hot-loader/root';
import * as BooksAPI from './BooksAPI';
import './styles.css';

import Header from './components/Header';
import Search from './components/Search';
import Book from './components/Book';
import AddBook from './components/AddBook';
import { Route } from 'react-router-dom';

class App extends React.Component {
  state = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
  };
  componentDidMount = () => {
    BooksAPI.getAll().then((res) => {
      let currentlyReadingBooks = res.filter(
        (book) => book.shelf === 'currentlyReading'
      );
      let wantToReadBooks = res.filter((book) => book.shelf === 'wantToRead');
      let readBooks = res.filter((book) => book.shelf === 'read');
      this.setState({ currentlyReadingBooks, wantToReadBooks, readBooks });
    });
  };
  addNewBook = () => {
    this.setState({ showSearchPage: true });
  };
  render() {
    // this.showById('evuwdDLfAyYC');
    return (
      <div className="app">
        <Route path="/create" render={() => <Search />} />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <Header title={'Myreads'} />
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.currentlyReadingBooks.map((book) => {
                          return (
                            <li key={book.id}>
                              <Book book={book} />
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.wantToReadBooks.map((book) => {
                          return (
                            <li key={book.id}>
                              <Book book={book} />
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.readBooks.map((book) => {
                          return (
                            <li key={book.id}>
                              <Book book={book} />
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <AddBook addBook={this.addNewBook} />
            </div>
          )}
        />
      </div>
    );
  }
}
export default hot(App);
