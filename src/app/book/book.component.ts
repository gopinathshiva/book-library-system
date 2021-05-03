import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../book.reducer';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {

  @Input() book!: Book;

  @Output() removeBook: EventEmitter<string> = new EventEmitter<string>();
  @Output() editBook: EventEmitter<string> = new EventEmitter<string>();
}
