import { combineReducers } from "redux"

import books from "./booksReducer"

export default combineReducers({
  bookReducer: books
})
