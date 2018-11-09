//@flow
import React from "react";
import { Link } from 'react-router-dom';

type Props = {
    suggestionsDisplay: bool,
    books: Array<Object>,
    query: string,
    results: number
}

export default class Suggestions extends React.Component<Props> {
    render() {

        const { suggestionsDisplay } = this.props
        let books = this.props.books
        let BookComponents: Array<Object>
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