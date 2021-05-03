import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {isLoading, selectBooks} from '../store/book.selector';
import {Book, BookState} from '../store/book.reducer';
import {deleteBook, getBooks} from '../store/book.actions';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books$: Observable<Book[]> = this.store.select(selectBooks);
  isLoading$ = this.store.select(isLoading);
  searchBook = '';
  searchChanged: Subject<string> = new Subject<string>();

  constructor(private store: Store<{ books: BookState }>,
              private router: Router) {
    this.searchChanged.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(search => {
      this.searchBook = search;
    });
  }

  async ngOnInit(): Promise<void> {
    this.store.dispatch(getBooks());
  }

  searchChange(search: string): void {
    this.searchChanged.next(search);
  }

  handleRemoveBook(id: string): void {
    this.store.dispatch(deleteBook({ id }));
  }

  async addBook(): Promise<void> {
    await this.router.navigate([`/book/`]);
  }

  async handleEditBook(id: string): Promise<void> {
    await this.router.navigate([`/book/${id}`]);
  }

}
