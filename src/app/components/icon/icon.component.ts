import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: [
    './icon.component.scss'
  ],
  host: {
    class: 'app-icon'
  }
})
export class IconComponent implements OnInit {
  @Input() type: string = 'arrow';
  @Input() size: number = 16;
  prefix: string = 'icon';
  constructor() {}

  ngOnInit(): void {}
}
