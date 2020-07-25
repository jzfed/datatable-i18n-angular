import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';
import { CLASS_PREFIX } from '../../common/ts/constant';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    './input.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit, AfterViewChecked {
  @Input() val;
  @Input() isInput: boolean = false;
  @Input() disabled: boolean = false;
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
  @ViewChild('inputDom') inputDom: ElementRef;
  tabIndex = -1;

  prefix: string = `${CLASS_PREFIX}input-wrapper`;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewChecked() {
    // if (this.isInput) {
    //   console.log('set focus');
    //   this.inputDom.nativeElement.focus();
    // }
  }
  handlePlaceholderClick($event) {
    if (this.disabled) return;
    this.tabIndex = 0;
    this.onPlaceholderClick.emit($event);
    console.log('handlePlaceholderClick');
  }

  handlePlaceHolderBlur($event) {
    if (this.disabled) return;
    this.tabIndex = -1;
    this.onPlaceHolderBlur.emit($event);
    console.log('onPlaceHolderBlur');
  }

  handlePlaceholderDoubleClick($event) {
    if (this.disabled) return;
    this.onPlaceholderDoubleClick.emit($event);
  }

  handleInputBlur($event) {
    if (this.disabled) return;
    console.log('InputComponent -> handleInputBlur -> handleInputBlur');
    this.onInputBlur.emit($event);
  }

  handleChange($event) {
    if (this.disabled) return;
    this.onValueChange.emit($event);
  }
}
