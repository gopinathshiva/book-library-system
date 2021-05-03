import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {isLoading} from './store/book.selector';
import {BookState} from './store/book.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  isLoading = false;

  constructor(private store: Store<{ book: BookState }>) {}

  ngOnInit(): void {
    this.store.select(isLoading).subscribe(isApiLoading => {
      setTimeout(() => {
        this.isLoading = isApiLoading;
      }, 0);
    });
  }
}
