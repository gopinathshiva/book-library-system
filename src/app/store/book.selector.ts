import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Book, BookState} from './book.reducer';

export const selectFeatureBooks = createFeatureSelector<BookState>(
  'book'
);

export const isLoading = createSelector(
  selectFeatureBooks,
  (state: BookState) => state.isLoading
);

export const selectBooks = createSelector(
  selectFeatureBooks,
  (state: BookState) => state.books
);

export const getBookById = createSelector(
  selectBooks,
  (books: Book[], props: {id: string}) => books.find(book => book.id === props.id)
);

export const apiMessage = createSelector(
  selectFeatureBooks,
  (state: BookState) => state.message
);
