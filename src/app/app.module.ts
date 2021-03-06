import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import { AppHeaderComponent } from './app-header/app-header.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';
import { LoaderComponent } from './loader/loader.component';
import { BookFormComponent } from './book-form/book-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import {BookEffects} from './store/book.effects';
import {reducer} from './store/book.reducer';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    BookListComponent,
    BookComponent,
    LoaderComponent,
    BookFormComponent,
    SearchPipe,
    FloatingButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({book: reducer}, {}),
    EffectsModule.forRoot([BookEffects]),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
