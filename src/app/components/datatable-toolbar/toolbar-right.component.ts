import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-right',
  template: ` <ng-content></ng-content> `
})
export class ToolbarRightComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
