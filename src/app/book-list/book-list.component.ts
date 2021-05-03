import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Book, BookState} from '../book.reducer';
import {Observable} from 'rxjs';
import * as fromBook from '../book.selector';
import {deleteBook, getBooks} from '../book.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books$: Observable<Book[]> = this.store.select(fromBook.selectBooks);
  searchBook = '';

  constructor(private store: Store<{ books: BookState }>,
              private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(getBooks());
  }

  handleRemoveBook(id: string): void {
    this.store.dispatch(deleteBook({ id }));
  }

  async handleEditBook(id: string): Promise<void> {
    await this.router.navigate([`/book/${id}`]);
  }

}
