import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {Book, BookState} from './book.reducer';
import { addBook, editBook, deleteBook, getBooks } from './book.actions';
import {Observable} from 'rxjs';

const mockBook = {
  name: 'asdf',
  author: 'asdf',
  count: 0,
  description: 'asdf',
  id: ''
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'book-library-system';

  constructor(private store: Store<{ books: BookState }>) {
    store.select('books').subscribe(state => {
      console.log(state);
    });
  }

  getBooks(): void {
    this.store.dispatch(getBooks({ books: [] }));
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
