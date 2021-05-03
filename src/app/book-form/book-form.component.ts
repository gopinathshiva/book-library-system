import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {BookState} from '../store/book.reducer';
import {addBook, clearApiMessage, editBook} from '../store/book.actions';
import {apiMessage, getBookById} from '../store/book.selector';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  constructor(private store: Store<{ book: BookState }>,
              private route: ActivatedRoute) { }

  message$ = this.store.select(apiMessage);

  bookForm = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl(''),
    count: new FormControl(null, [Validators.required, Validators.min(1)] ),
    url: new FormControl('https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80',
      Validators.required),
  });

  get name(): AbstractControl | null { return this.bookForm.get('name'); }
  get author(): AbstractControl | null { return this.bookForm.get('author'); }
  get url(): AbstractControl | null { return this.bookForm.get('url'); }
  get count(): AbstractControl | null { return this.bookForm.get('count'); }

  async ngOnInit(): Promise<void> {
    this.store.dispatch(clearApiMessage());
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const selectedBook = await this.store.select(getBookById, {id}).pipe(take(1)).toPromise();
      if (!selectedBook) {
        // Possible TODO fetch from api service
      } else {
        const { name, author, url, count, description } = selectedBook;
        this.bookForm.patchValue({
          name,
          author,
          description,
          count,
          url,
        });
      }
    }
  }

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(editBook({ book: {...this.bookForm.value, id } }));
    } else {
      this.store.dispatch(addBook({ book: this.bookForm.value }));
    }
  }

}
