import React from "react";
import * as Actions from '../bookAction'
import { Link } from 'react-router-dom';
import '../../css/SearchBox.css'
import Waypoint from 'react-waypoint';
import { connect} from "react-redux"
import { bindActionCreators } from "redux";



class Results extends React.Component {

  constructor() {
    super();
    this.state = {
      booksAvailable: true,
      results: '',
      page: 1
    };
  }


  componentWillMount() {
    const query = this.props.match.params.search
    this.props.bookSearch(query, this.state.page)
  }


  _handleWaypointEnter = () =>{
    console.log('handleWaypointEnter')
    console.log(this.state.page)

    const query = this.props.match.params.search
    this.props.bookSearch(query, this.state.page + 1)

    this.setState({
      page: this.state.page + 1
    })

    this.props.fetchingBooks()

  }
  

  render() {


    const  books = this.props.books;

    let BookComponents = books.map((book) => {
      return (
        <li className="singleResult" key={book.id}>
          <Link to={`/books/${book.id}`}>
            <span className="bookName">{book.book}</span>
          </Link>
          <span className="authorName">{book.author}</span>
        </li>
      )
    });

    if (!books.length && !this.state.booksAvailable) {
      BookComponents = <li className="singleResult" key='123457'>
        <span className="authorName">No results Found</span>
      </li>
    }

    return (
      <div className="completeResults">
        <Link to='/'>Home</Link>
        <ul>{BookComponents}</ul>
        {
          this.props.isLoading ?
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

const mapStateToProps = store => ({
  books: store.books.books,
  results: store.books.results,
  isLoading:  store.books.isLoading
})

const mapDispatchToProps = dispatch => ({
  bookSearch: bindActionCreators(Actions.bookSearch, dispatch),
  fetchingBooks: bindActionCreators(Actions.fetchingBooks, dispatch),
})

Results = connect(mapStateToProps, mapDispatchToProps)(Results)

export default Results