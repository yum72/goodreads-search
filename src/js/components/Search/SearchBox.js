//@flow
import React from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import '../../../css/SearchBox.css'
import { withRouter } from "react-router";
import Suggestions from "./Suggestions"
import * as Actions from '../../bookAction'


type Props = {
  books: Array<Object>,
  results: number,
  bookSearch: Function,
  history: Object
}

type State = {
  suggestionsDisplay: bool,
  query: string,
  redirect?: bool
}

const WAIT_INTERVAL:number = 700
let typingTimer:any


class SearchBox extends React.Component<Props,State> {
  
  state = {
    suggestionsDisplay: true,
    query: '',
    redirect: false
  }

  handleClick = () => {
    if (this.state.query !== '') {
      this.setState({ redirect: true });
    }
    else {
      alert('Empty Search')
    }
  }

  handleChange = (e:Object) => {
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

  handleClickList = (e:Object) => {
    if (this.node.contains(e.target)) {
      //click inside list
      return
    }

    //outside click
    this.handleClickOutside()
  }

  handleClickOutside = () => {
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


  node: any

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
        <button className="searchButton" onClick={this.handleClick}>Search</button>
        <div ref={node => this.node = node}>
          <Suggestions books={books} results={this.props.results} query={this.state.query} suggestionsDisplay={this.state.suggestionsDisplay} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  books: store.bookReducer.books,
  results: store.bookReducer.results
})

const mapDispatchToProps = dispatch => ({
  bookSearch: bindActionCreators(Actions.bookSearch, dispatch),
})

SearchBox = connect(mapStateToProps, mapDispatchToProps)(SearchBox)

export default withRouter(SearchBox)