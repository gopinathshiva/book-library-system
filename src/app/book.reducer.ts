import {Action, createReducer, on} from '@ngrx/store';
import {
  addBook,
  editBook,
  deleteBook,
  getBooks,
  addBookApiSuccess,
  editBookApiSuccess,
  deleteBookApiSuccess,
  getBooksApiSuccess
} from './book.actions';

export const initialState: BookState = {
  books: [],
  isLoading: false,
  message: null,
};

const bookReducer = createReducer(
  initialState,
  on(addBook, (state: BookState) => {
    return {...state, isLoading: true};
  }),
  on(editBook, (state: BookState) => {
    return {...state, isLoading: true};
  }),
  on(deleteBook, (state: BookState) => {
    return {...state, isLoading: true};
  }),
  on(getBooks, (state: BookState) => {
    return {...state, isLoading: true};
  }),
  on(addBookApiSuccess, (state: BookState, { book, message }) => {
    return {...state, books: [...state.books, book], isLoading: false, message};
  }),
  on(editBookApiSuccess, (state: BookState, { book, message }) => {
    return {...state, books: state.books.map(s => (s.id === book.id) ? book : s), isLoading: false, message};
  }),
  on(deleteBookApiSuccess, (state: BookState, { id, message }) => {
    return {...state, books: state.books.filter(s => s.id !== id), isLoading: false, message};
  }),
  on(getBooksApiSuccess, (state: BookState, { books, message }) => {
    return {...state, books, isLoading: false, message };
  }),
);

export function reducer(bookState: BookState, action: Action): any {
  return bookReducer(bookState, action);
}

export interface Book {
  author: string;
  count: number;
  description: string;
  id: string;
  name: string;
}

export interface BookState {
  books: Book[];
  isLoading: boolean;
  message: string | null;
}

export interface AppState {
  book: BookState;
}
