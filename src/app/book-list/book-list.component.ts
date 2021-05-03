import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Book, BookState} from '../book.reducer';
import {Observable} from 'rxjs';
import * as fromBook from '../book.selector';
import {deleteBook, getBooks} from '../book.actions';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books$: Observable<Book[]> = this.store.select(fromBook.selectBooks);

  constructor(private store: Store<{ books: BookState }>) {}

  ngOnInit(): void {
    this.store.dispatch(getBooks());
  }

  handleRemoveBook(id: string): void {
    this.store.dispatch(deleteBook({ id }));
  }

}
