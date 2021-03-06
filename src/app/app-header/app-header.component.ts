import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent {

  constructor(private router: Router) { }

  async gotoHome(): Promise<void> {
    await this.router.navigate(['/']);
  }

}
