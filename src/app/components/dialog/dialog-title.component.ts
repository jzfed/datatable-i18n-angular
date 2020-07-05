import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dialog-title',
  template: `<div class="dialog-title">
  <ng-content></ng-content><span>X</span>
  </div>`
})
export class DialogTitleComponent implements OnInit {
  constructor(public el: ElementRef) {}

  ngOnInit(): void {}
}
