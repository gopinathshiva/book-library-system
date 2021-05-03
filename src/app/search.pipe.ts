import { Pipe, PipeTransform } from '@angular/core';
import {Book} from './book.reducer';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(books: Book[] | null, search: string): Book[] {
    if (!books) {
      return [];
    }
    return books.filter(book => book.name.indexOf(search) >= 0);
  }

}
