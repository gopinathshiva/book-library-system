import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {BookState} from './book.reducer';
import { addBook, editBook, deleteBook, getBooks } from './book.actions';
import {isLoading} from './book.selector';
import {of} from 'rxjs';

const mockBook = {
  name: 'asdf',
  author: 'asdf',
  count: 0,
  description: 'asdf',
  id: '',
  url: '',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'book-library-system';
  isLoading$ = of(false);

  constructor(private store: Store<{ book: BookState }>) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading$ = this.store.select(isLoading);
    }, 0);
  }

  getBooks(): void {
    this.store.dispatch(getBooks());
  }

  addBook(): void {
    this.store.dispatch(addBook({ book: mockBook }));
  }

  editBook(): void {
    this.store.dispatch(editBook({ book: mockBook }));
  }

  deleteBook(): void {
    this.store.dispatch(deleteBook({ id: mockBook.id }));
  }
}
