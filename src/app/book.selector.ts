import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState, BookState} from './book.reducer';

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
