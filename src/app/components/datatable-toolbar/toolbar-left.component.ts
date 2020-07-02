import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-left',
  template: ` <ng-content></ng-content> `
})
export class ToolbarLeftComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
