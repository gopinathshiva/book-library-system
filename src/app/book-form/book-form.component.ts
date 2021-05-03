import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  constructor() { }

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

  ngOnInit(): void {
  }

  onSubmit(): void {
    // this.bookForm.patchValue({
    //   name: 'fsa',
    // });
  }

}
