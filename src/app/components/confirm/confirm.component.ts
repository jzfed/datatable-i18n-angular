import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: [
    './confirm.component.scss'
  ]
})
export class ConfirmComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() title: string;
  @Input() message: string;
  @Input() isLoading: boolean = false;
  @Output() onConfirm = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleConfirm() {
    this.onConfirm.emit();
  }

  handleCancel() {
    this.onCancel.emit();
  }
}
