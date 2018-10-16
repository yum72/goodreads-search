//@flow
import React from "react";
import { Link } from 'react-router-dom';

export const BookRow = (book:Object) => {
    return (
        <li className="singleResult" key={book.id}>
            <Link to={`/books/${book.id}`}>
                <span className="bookName">{book.book}</span>
            </Link>
            <span className="authorName">{book.author}</span>
        </li>
    )
}