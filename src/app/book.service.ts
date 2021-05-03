import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from './book.reducer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(
    private http: HttpClient,
  ) {}

  private static readonly BASE_URL = 'http://localhost:4000/books';

  getBooks(): Observable<GetBookApiResponse> {
    return this.http.get<GetBookApiResponse>(BookService.BASE_URL);
  }

  addBook(book: Book): Observable<AddBookApiResponse> {
    return this.http.post<AddBookApiResponse>(BookService.BASE_URL, book);
  }

  editBook(book: Book): Observable<EditBookApiResponse> {
    return this.http.put<EditBookApiResponse>(BookService.BASE_URL, book);
  }

  deleteBook(id: string): Observable<DeleteBookApiResponse> {
    return this.http.delete<DeleteBookApiResponse>(`${BookService.BASE_URL}/${id}`);
  }
}

export interface Message {
  message: string;
}

export interface AddBookApiResponse extends Message {
  book: Book;
}

export interface EditBookApiResponse extends Message {
  book: Book;
}

export interface GetBookApiResponse extends Message {
  books: Book[];
}

export interface DeleteBookApiResponse extends Message {
  id: string;
}
