import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dialog-content',
  template: `
    <div class="dialog-content">
      <ng-content></ng-content>
    </div>
  `
})
export class DialogContentComponent implements OnInit {
  constructor(public el: ElementRef) {}

  ngOnInit(): void {}
}
