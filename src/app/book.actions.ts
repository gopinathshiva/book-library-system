import {createAction, props} from '@ngrx/store';
import {Book} from './book.reducer';
import {AddBookApiResponse, DeleteBookApiResponse, EditBookApiResponse, GetBookApiResponse} from './book.service';

export enum BookActions {
  ADD_BOOK = '[Book Component] Add Book',
  EDIT_BOOK = '[Book Component] Edit Book',
  DELETE_BOOK = '[Book Component] Delete Book',
  GET_BOOKS = '[Book Component] Get Books',

  GET_BOOKS_SUCCESS = '[Book API] Get Books Success',
  ADD_BOOK_SUCCESS = '[Book API] Add Book Success',
  EDIT_BOOK_SUCCESS = '[Book API] Edit Book Success',
  DELETE_BOOK_SUCCESS = '[Book API] Delete Book Success',
  API_FAILURE = '[Book API] Failed',
}

export const addBook = createAction(BookActions.ADD_BOOK, props<{ book: Book }>());
export const editBook = createAction(BookActions.EDIT_BOOK, props<{ book: Book }>());
export const deleteBook = createAction(BookActions.DELETE_BOOK, props<{ id: string }>());
export const getBooks = createAction(BookActions.GET_BOOKS);

export const addBookApiSuccess = createAction(BookActions.ADD_BOOK_SUCCESS, props<AddBookApiResponse>());
export const editBookApiSuccess = createAction(BookActions.EDIT_BOOK_SUCCESS, props<EditBookApiResponse>());
export const deleteBookApiSuccess = createAction(BookActions.DELETE_BOOK_SUCCESS, props<DeleteBookApiResponse>());
export const getBooksApiSuccess = createAction(BookActions.GET_BOOKS_SUCCESS, props<GetBookApiResponse>());
export const booksApiFailed = createAction(BookActions.API_FAILURE, props<any>());
