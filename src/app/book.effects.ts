import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { BookService } from './book.service';
import { BookActions } from './book.actions';
import {Book} from './book.reducer';

@Injectable()
export class BookEffects {

  getBooks$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.GET_BOOKS),
    mergeMap(() => this.bookService.getBooks()
      .pipe(
        map(({message, books}) => ({ type: BookActions.GET_BOOKS_SUCCESS, books, message })),
        catchError((error) => of({ type: BookActions.API_FAILURE, error }))
      ))
    )
  );

  addBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.ADD_BOOK),
    exhaustMap((action: {book: Book}) => {
      return this.bookService.addBook(action.book)
        .pipe(
          map(({book, message}) => ({ type: BookActions.ADD_BOOK_SUCCESS, book, message })),
          catchError((error) => of({ type: BookActions.API_FAILURE, error }))
        );
      }
    ))
  );

  editBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.EDIT_BOOK),
    exhaustMap((action: {book: Book}) => this.bookService.editBook(action.book)
      .pipe(
        map(({book, message}) => ({ type: BookActions.EDIT_BOOK_SUCCESS, book, message })),
        catchError((error) => of({ type: BookActions.API_FAILURE, error }))
      ))
    )
  );

  deleteBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.DELETE_BOOK),
    exhaustMap(({id}) => this.bookService.deleteBook(id)
      .pipe(
        map(({message}) => ({ type: BookActions.DELETE_BOOK_SUCCESS, id, message })),
        catchError((error) => of({ type: BookActions.API_FAILURE, error }))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) {}
}
