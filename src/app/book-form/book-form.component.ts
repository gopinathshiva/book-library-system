import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {BookState} from '../book.reducer';
import {addBook} from '../book.actions';
import {ActivatedRoute} from '@angular/router';
import {getBookById} from '../book.selector';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  constructor(private store: Store<{ book: BookState }>,
              private route: ActivatedRoute) { }

  bookForm = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl(''),
    count: new FormControl(null, [Validators.required, Validators.min(1)] ),
    url: new FormControl('', Validators.required),
  });

  get name(): AbstractControl | null { return this.bookForm.get('name'); }
  get author(): AbstractControl | null { return this.bookForm.get('author'); }
  get url(): AbstractControl | null { return this.bookForm.get('url'); }
  get count(): AbstractControl | null { return this.bookForm.get('count'); }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const selectedBook = await this.store.select(getBookById, {id}).pipe(take(1)).toPromise();
      console.log(selectedBook);
      if (!selectedBook) {
        // TODO fetch service and update book
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
    this.store.dispatch(addBook({ book: this.bookForm.value }));
  }

}
