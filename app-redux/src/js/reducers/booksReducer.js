export default function reducer(state = {
    books : [],
    isLoading : false,
    results : '',
    singleBook : {}
}, action) {

    switch (action.type) {
        case "GET_ALL": {
            return {
                ...state, 
                books: [...state.books]
            }  
        }
        case "RECEIVE_BOOKS": {
            return {
                ...state, 
                books: action.payload.books,
                results: action.payload.results,
                isLoading: false
            }
        }
        case "BOOKS_FETCHING": {
            return {
                ...state, 
                isLoading: true
            }
        }
        case "RECEIVE_RESULTS": {
            return {
                ...state, 
                results: action.results,
                isLoading: false
            }
        }
        case "SINGLE_BOOK": {
            return {
                ...state, 
                singleBook: action.payload.book
            }
        }
        case "ADD_BOOKS": {
            let addedBooks = state.books.concat(action.payload.books)
            return {
                ...state, 
                books: addedBooks,
                results: action.payload.results,
                isLoading: false
            }
        }
        // default : {
        //     this.results = action.results;
        //     this.books = action.books;
        // 
        // }

    }

    return state
}
