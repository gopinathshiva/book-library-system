import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingButtonComponent {

  @Output() handleClick = new EventEmitter();
}
