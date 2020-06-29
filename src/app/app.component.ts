import { Component } from '@angular/core';
import { CLASS_PREFIX, dataIndex } from './common/ts/constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ]
})
export class AppComponent {
  title = 'datatable-i18n-angular';
  isInput: boolean;
  dataIndex = dataIndex;
  constructor() {
    (document.querySelector('.jui-dual-ring-loading') as HTMLDivElement).style.display = 'none';
  }
  test($event) {
    this.isInput = !this.isInput;
    console.log($event);
  }
}
