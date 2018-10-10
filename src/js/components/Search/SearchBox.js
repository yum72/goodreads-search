import React from "react";
import bookSearch from '../../bookAction'
import BookStore from '../../stores/BookStore'
import { Redirect, Link } from 'react-router-dom';
import '../../../css/SearchBox.css'
import { withRouter } from "react-router";



const WAIT_INTERVAL = 1000
let typingTimer = ''



class SearchBox extends React.Component {

  constructor() {
    super();
    this.getBooks = this.getBooks.bind(this)
    this.state = {
      books: [],
      results: BookStore.getResults(),
      redirect: false,
      query: '',
      suggestionsDisplay: true
    };
  }

  handleClick = () => {
    this.setState({ redirect: true });
  }

  handleChange = (e) => {
    
    this.setState({
      suggestionsDisplay: true
    })

    clearTimeout(typingTimer);
    const query = e.target.value
    this.setState({
      query
    })
    typingTimer = setTimeout(async () => {
      await bookSearch(query, 1)
    }, WAIT_INTERVAL);

  }

  handleClickList = (e) => {
    if (this.node.contains(e.target)) {
      //click inside list
      return
    }

    //outside click
    this.handleClickOutside()
  }

  handleClickOutside = (e) => {
    this.setState({
      suggestionsDisplay: false
    })
  }

  handleInputClick = () => {
    this.setState({
      suggestionsDisplay: true
    })
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickList, false)
    BookStore.on("change", this.getBooks);

  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickList, false)
    BookStore.removeListener("change", this.getBooks);
  }

  getBooks() {
    this.setState({
      books: BookStore.getFiveBooks(),
      results: BookStore.getResults()
    });
  }

  render() {

    if (this.state.redirect) {
      this.props.history.push('/results/' + this.state.query);
      //return <Redirect push to={`/results/${this.state.query}`} />; 
    }

    const { books } = this.state;
    const { suggestionsDisplay } = this.state
    let BookComponents

    if (suggestionsDisplay) {
      BookComponents = books.map((book) => {
        return (
          <li className="singleResult" key={book.id}>
            <Link to={`/books/${book.id}`}>
              <span className="bookName">{book.book}</span>
              <span className="authorName">{book.author}</span>
            </Link>
          </li>
        )
      });

      const { results } = this.state;

      if (results && books.length) {
        BookComponents.push(
          <li className="totalResults singleResult" key={'435123'}>
            <Link to={`/results/${this.state.query}`}>
              <span className="authorName">{results} Total Results</span>
            </Link>
          </li>)
      }
    }

    return (
      <div className="searchBar">
        <input type="text" onChange={this.handleChange} onClick={this.handleInputClick} className="searchInput" />
        <button className="searchButton" onClick={(e)=>{this.handleClick(e)}}>Search</button>
        <ul className="bookList" ref={node => this.node = node}>{BookComponents}</ul>
      </div>
    );
  }
}

export default withRouter(SearchBox)