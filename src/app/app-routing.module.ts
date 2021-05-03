import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookListComponent} from './book-list/book-list.component';
import {BookFormComponent} from './book-form/book-form.component';

// Possible TODO: Lazy routing
const routes: Routes = [
  { path: 'books', component: BookListComponent },
  { path: 'book', component: BookFormComponent },
  { path: 'book/:id', component: BookFormComponent },
  { path: '',   redirectTo: '/books', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
