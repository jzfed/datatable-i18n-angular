import { Component, OnInit, Input } from '@angular/core';
import { CLASS_PREFIX } from '../../common/js/constant';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: [
    './input.component.scss'
  ]
})
export class InputComponent implements OnInit {
  @Input() val;
  @Input() isInput: boolean;
  @Input() placeHolderClass: string;
  @Input() onPlaceHolderBlur;
  @Input() onPlaceholderClick;
  @Input() onPlaceholderDoubleClick;
  @Input() onPlaceholderMouseout;
  @Input() onEnterPress;
  @Input() onInputBlur;
  @Input() onInputFocus;
  @Input() onValueChange;
  @Input() selected: boolean;

  prefix: string = `${CLASS_PREFIX}input-wrapper`;

  constructor() {}

  ngOnInit(): void {}
}
