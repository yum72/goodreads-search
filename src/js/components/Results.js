//@flow
import React from "react";
import * as Actions from '../bookAction'
import { Link } from 'react-router-dom';
import '../../css/SearchBox.css'
import Waypoint from 'react-waypoint';
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import { type } from "os";
const R = require('ramda');

type State = {
  page: number
}

type Props = {
  bookSearch: Function,
  fetchingBooks: Function,
  books: Array<Object>,
  results: number,
  isLoading: bool,
  booksAvailable: bool,
  match: Object
}

class Results extends React.Component <Props, State> {

  constructor() {
    super();
    this.state = {
      page: 1
    };
  }


  componentWillMount() {
    const query = this.props.match.params.search
    this.props.bookSearch(query, this.state.page)
    this._handleWaypointEnter()
  }


  _handleWaypointEnter = () => {
    if (this.props.booksAvailable) {
    const query = this.props.match.params.search
    this.props.bookSearch(query, this.state.page + 1)

    this.setState({
      page: this.state.page + 1
    })

      this.props.fetchingBooks()
    }
  }


  render() {

    const books = this.props.books;

    let BookComponents = R.map(bookLiMarkup, books)

    if (!this.props.booksAvailable) {
      BookComponents.push(<li className="singleResult" key='123457'>
        <span className="authorName">No More Results</span>
      </li>)
    }

    return (
      <div className="completeResults">
        <Link to='/'>Home</Link>
        <ul>{BookComponents}</ul>
        {
          this.props.isLoading ?
            <div className='loader'>Loading...</div> :
            <Waypoint
              onEnter={this._handleWaypointEnter}
            />
        }
      </div>
    );
  }
}

const bookLiMarkup = (book) => {
  return (
    <li className="singleResult" key={book.id}>
      <Link to={`/books/${book.id}`}>
        <span className="bookName">{book.book}</span>
      </Link>
      <span className="authorName">{book.author}</span>
    </li>
  )
}

const mapStateToProps = store => ({
  books: store.bookReducer.books,
  results: store.bookReducer.results,
  isLoading: store.bookReducer.isLoading,
  booksAvailable: store.bookReducer.booksAvailable
})

const mapDispatchToProps = dispatch => ({
  bookSearch: bindActionCreators(Actions.bookSearch, dispatch),
  fetchingBooks: bindActionCreators(Actions.fetchingBooks, dispatch),
})

Results = connect(mapStateToProps, mapDispatchToProps)(Results)

export default Results