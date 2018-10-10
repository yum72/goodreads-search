import React from "react";
import bookSearch from '../bookAction'
import BookStore from '../stores/BookStore'
import { Link } from 'react-router-dom';
import '../../css/SearchBox.css'
import Waypoint from 'react-waypoint';



export default class Results extends React.Component {

  constructor() {
    super();
    this.getBooks = this.getBooks.bind(this)
    this.state = {
      books: [{
        id: 123475463244,
        book: "",
        author: 'Searching'
      }],
      results: '',
      page: 1
    };
  }


  componentWillMount() {
    const query = this.props.match.params.search
    bookSearch(query, this.state.page)
    BookStore.on("change", this.getBooks);
  }

  componentWillUnmount() {
    BookStore.removeListener("change", this.getBooks);
  }

  getBooks = () => {
    this.setState({
      books: BookStore.getAll(),
      results: BookStore.getResults()
    });
  }

  getMoreBooks = () => {
    const { books } = this.state;
    const addBooks = books.concat(BookStore.getAll())
    this.setState({
      books: addBooks
    });
  }

  _handleWaypointEnter = () =>{
    console.log('handleWaypointEnter')
    console.log(this.state.page)

    const query = this.props.match.params.search
    bookSearch(query, this.state.page + 1)

    this.setState({
      page: this.state.page + 1
    })

  }
  

  handleClick = (e) => {

    // console.log(this.state.page)

    // const query = this.props.match.params.search
    // bookSearch(query, this.state.page + 1)

    // this.setState({
    //   page: this.state.page + 1
    // })

    // //this.getMoreBooks()

  }

  render() {


    const { books } = this.state;

    let BookComponents = books.map((book) => {
      return (
        <li className="singleResult" key={book.id}>
          <Link to={`/books/${book.id}`}>
            <span className="bookName">{book.book}</span>
            <span className="authorName">{book.author}</span>
          </Link>
        </li>
      )
    });

    if (!books.length) {
      BookComponents = <li className="singleResult" key='123457'>
        <span className="authorName">No results Found</span>
      </li>
    }

    return (
      <div className="completeResults">
        <Link to='/'>Home</Link>
        <ul>{BookComponents}</ul>
        {
          BookStore.getLoading() ?
          <h3 className = "loading">Loading...</h3>:
          <Waypoint
          onEnter={this._handleWaypointEnter}
          onLeave={this._handleWaypointLeave}
        />
        }
        
      </div>
    );
  }
}

