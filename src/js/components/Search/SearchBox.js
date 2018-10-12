import React from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import '../../../css/SearchBox.css'
import { withRouter } from "react-router";
import Suggestions from "./Suggestions"
import * as Actions from '../../bookAction'


const WAIT_INTERVAL = 700
let typingTimer = ''



class SearchBox extends React.Component {

  constructor() {
    super();
    this.state = {
      suggestionsDisplay: true,
      query: ''
    };
  }

  handleClick = () => {
    if (this.state.query !== '') {
      this.setState({ redirect: true });
    }
    else {
      alert('Empty Search')
    }
  }

  handleChange = (e) => {

    this.setState({
      suggestionsDisplay: true
    })

    clearTimeout(typingTimer);
    const query = e.target.value
    this.setState({
      query: query
    })
    typingTimer = setTimeout(async () => {
      await this.props.bookSearch(query, 1)
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
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickList, false)
  }

  render() {

    if (this.state.redirect) {
      this.props.history.push('/results/' + this.state.query);
    }

    let books = this.props.books;

    if (books.length > 5) {
      books = books.slice(0, 5)
    }

    return (
      <div className="searchBar">
        <input type="text" onChange={this.handleChange} onClick={this.handleInputClick} className="searchInput" />
        <button className="searchButton" onClick={(e) => { this.handleClick(e) }}>Search</button>
        <div ref={node => this.node = node}>
          <Suggestions books={books} results={this.props.results} query={this.state.query} suggestionsDisplay={this.state.suggestionsDisplay} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  books: store.books.books,
  results: store.books.results
})

const mapDispatchToProps = dispatch => ({
  bookSearch: bindActionCreators(Actions.bookSearch, dispatch),
})

SearchBox = connect(mapStateToProps, mapDispatchToProps)(SearchBox)

export default withRouter(SearchBox)