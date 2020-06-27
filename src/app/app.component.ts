import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ]
})
export class AppComponent {
  title = 'datatable-i18n-angular';
  constructor() {
    (document.querySelector('.jui-dual-ring-loading') as HTMLDivElement).style.display = 'none';
  }
}
