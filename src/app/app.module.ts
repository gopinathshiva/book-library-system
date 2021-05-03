import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducer } from './book.reducer';
import { EffectsModule } from '@ngrx/effects';
import {BookEffects} from './book.effects';
import {HttpClientModule} from '@angular/common/http';
import { AppHeaderComponent } from './app-header/app-header.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';
import { LoaderComponent } from './loader/loader.component';
import { BookFormComponent } from './book-form/book-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    BookListComponent,
    BookComponent,
    LoaderComponent,
    BookFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({book: reducer}, {}),
    EffectsModule.forRoot([BookEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
