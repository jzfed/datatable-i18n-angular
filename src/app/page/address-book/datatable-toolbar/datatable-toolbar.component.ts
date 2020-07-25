import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datatable-toolbar',
  template: `
    <div class="table-toolbar">
      <ng-content></ng-content>
    </div>
  `,
})
export class DatatableToolbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
