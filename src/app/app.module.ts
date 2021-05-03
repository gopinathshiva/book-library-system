import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducer } from './book.reducer';
import { EffectsModule } from '@ngrx/effects';
import {BookEffects} from './book.effects';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({books: reducer}, {}),
    EffectsModule.forRoot([BookEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
