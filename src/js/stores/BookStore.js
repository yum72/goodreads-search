import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class BookStore extends EventEmitter {
    constructor() {
        super()
        this.books = [
            // {
            //     id: 1234,
            //     book: "Book Name",
            //     author: 'Author Name'
            // }
        ];
        this.isLoading = false
        this.results = '';
        this.singleBook = ''
    }

    getAll() {
        return this.books;
    }

    getResults() {
        return this.results;
    }

    getSingleBook() {
        return this.singleBook;
    }

    getFiveBooks() {
        if(this.books.length > 5){
            return this.books.slice(0, 5)
        }
        return this.books;
    }

    getLoading(){
        console.log('Loading : ',this.isLoading)
        return this.isLoading
    }

    getTenBooks(start) {
        if(this.books.length > 10 && this.books.length > 10 + start){
            return this.books.slice(start, 10 + start)
        }
        return this.books;
    }

    handleActions(action) {
        switch (action.type) {
            case "RECEIVE_BOOKS": {
                this.books = action.books;
                this.emit("change");
                this.isLoading = false
                break;
            }
            case "BOOKS_FETCHING": {
                this.isLoading = true
                this.emit("change");
                break;
            }
            case "RECEIVE_RESULTS": {
                this.results = action.results;
                this.emit("change");
                this.isLoading = false
                break;
            }
            case "SINGLE_BOOK": {
                this.singleBook = action.book;
                this.emit("change");
                break;
            }
            case "ADD_BOOKS": {
                console.log('ADD_BOOKS', this.books.concat(action.books).length)
                let addedBooks = this.books.concat(action.books)
                this.books = addedBooks
                this.isLoading = false
                this.emit("change");
                break;
            }
            // default : {
            //     this.results = action.results;
            //     this.books = action.books;
            //     this.emit("change");
            // }
            
        }
    }

}

const bookStore = new BookStore();
dispatcher.register(bookStore.handleActions.bind(bookStore));
window.bookStore = bookStore;
window.dispatcher = dispatcher;

export default bookStore;
