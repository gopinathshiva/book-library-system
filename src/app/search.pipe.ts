import { Pipe, PipeTransform } from '@angular/core';
import {Book} from './store/book.reducer';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(books: Book[] | null, search: string): Book[] {
    if (!books) {
      return [];
    }
    return books.filter(book => {
      return book.name.indexOf(search) >= 0 || book.author.indexOf(search) >= 0 || book.description.indexOf(search) >= 0
    });
  }

}
