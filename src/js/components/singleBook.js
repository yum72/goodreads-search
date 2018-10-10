import React from "react";
import BookStore from '../stores/BookStore'
import {getSingleBookDetails} from '../bookAction'
import { Link } from 'react-router-dom';
import '../../css/singlePage.css'

export default class SingleBook extends React.Component {

    constructor() {
        super();
        this.getBooks = this.getBooks.bind(this)
        this.state = {
            book: [],
            query: ''
        };
    }


    async componentWillMount() {
        const id = this.props.match.params.id
        await getSingleBookDetails(id)
        BookStore.on("change", this.getBooks);
        //console.log(book)
    }


    componentWillUnmount() {
        BookStore.removeListener("change", this.getBooks);
    }

    getBooks() {
        let book = BookStore.getSingleBook()
        this.setState({
            book: book
        });
        if(book.name == undefined){
            this.setState({
                book: {
                    name: 'Not Found'
                }
            });     
        }
    }

    render() {

        const { book } = this.state;

        return (
            <div className="completeResults">
                <Link to='/'>Home</Link>
                <div className = "wrapper">
                    <div>
                        <img src={book.imageURL}/>
                    </div>
                    <div className = "textBox">
                        <p>Book Name : {book.name}</p>
                        <p>Author :{book.author}</p>
                        <p>Average Rating :{book.avg_rating}</p>
                        <p>Total Rating :{book.total_rating}</p>
                    </div>
                </div>
            </div>
        );
    }
}

