import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Book, BookState} from '../book.reducer';
import {Observable} from 'rxjs';
import * as fromBook from '../book.selector';
import {deleteBook, getBooks} from '../book.actions';
import {Router} from '@angular/router';
import {isLoading} from '../book.selector';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books$: Observable<Book[]> = this.store.select(fromBook.selectBooks);
  searchBook = '';
  isLoading$ = this.store.select(isLoading);

  constructor(private store: Store<{ books: BookState }>,
              private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.store.dispatch(getBooks());
  }

  handleRemoveBook(id: string): void {
    this.store.dispatch(deleteBook({ id }));
  }

  async handleEditBook(id: string): Promise<void> {
    await this.router.navigate([`/book/${id}`]);
  }

}
