import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CLASS_PREFIX } from '../../common/ts/constant';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: [
    './input.component.scss'
  ]
})
export class InputComponent implements OnInit, OnChanges {
  @Input() val;
  @Input() isInput: boolean;
  @Input() placeHolderClass: string;
  @Input() selected: boolean;
  @Output() onPlaceholderClick = new EventEmitter();
  @Output() onPlaceHolderBlur = new EventEmitter();
  @Output() onPlaceholderDoubleClick = new EventEmitter();
  @Output() onPlaceholderMouseout = new EventEmitter();
  @Output() onEnterPress = new EventEmitter();
  @Output() onInputBlur = new EventEmitter();
  @Output() onInputFocus = new EventEmitter();
  @Output() onValueChange = new EventEmitter();

  prefix: string = `${CLASS_PREFIX}input-wrapper`;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log(changes);
  }
  handlePlaceholderClick() {
    this.onPlaceholderClick.emit('child click');
  }
}
