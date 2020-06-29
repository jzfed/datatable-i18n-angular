import { Component, OnInit, Input } from '@angular/core';
import { CLASS_PREFIX } from '../../common/ts/constant';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: [
    './button.component.scss'
  ]
})
export class ButtonComponent implements OnInit {
  @Input() type: string = 'default';
  @Input() size: string = 'normal';
  @Input() highlight: boolean;
  @Input() round: boolean;
  @Input() loading: boolean;
  prefix: string = `${CLASS_PREFIX}button`;
  highlightClass: string;
  roundClass: string;
  loadingClass: string;
  constructor() {}

  ngOnInit(): void {
    this.highlightClass = this.highlight ? 'highlight' : '';
    this.roundClass = this.round ? 'round-border' : '';
    this.loadingClass = this.loading ? 'loading' : '';
  }
}
