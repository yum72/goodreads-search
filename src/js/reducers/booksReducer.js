const initialState = {
    books: [],
    isLoading: false,
    results: '',
    singleBook: {},
    booksAvailable: true
}

export default function reducer(state = initialState, action) {

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
                //results: action.payload.results,
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
                results: action.payload.results,
                isLoading: false
            }
        }
        case "SINGLE_BOOK": {
            return {
                ...state,
                singleBook: action.payload.book
            }
        }
        case "NO_MORE_RESULTS": {
            return {
                ...state,
                booksAvailable: false,
                isLoading: false
            }
        }
        case "ADD_BOOKS": {
            let addedBooks = state.books.concat(action.payload.books)
            return {
                ...state,
                books: addedBooks,
                //results: action.payload.results,
                isLoading: false
            }
        }
        // default: {
        //     return state
        // }
    }

    return state
}