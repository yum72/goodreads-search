import React from "react";
import { Redirect, Link } from 'react-router-dom';

export default class Suggestions extends React.Component {
    render() {

        const { suggestionsDisplay } = this.props
        let books = this.props.books
        let BookComponents
        if (suggestionsDisplay && books && this.props.query !== '') {
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
            const { results } = this.props;
            if (results && books.length) {
                BookComponents.push(
                    <li className="totalResults singleResult" key={'435123'}>
                        <Link to={`/results/${this.props.query}`}>
                            <span className="authorName">{results} Total Results</span>
                        </Link>
                    </li>)
            }
        }

        return (
            <ul className="bookList">{BookComponents}</ul>
        )
    }
}