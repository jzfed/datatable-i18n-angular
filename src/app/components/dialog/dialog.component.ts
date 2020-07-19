import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ApplicationRef,
  ComponentRef,
  ViewContainerRef,
  ViewRef,
  ViewEncapsulation,
  ViewChild,
  ContentChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { CLASS_PREFIX } from 'src/app/common/ts/constant';
import { DialogContentComponent } from './dialog-content.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [
    './dialog.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() isOpen: boolean;
  @Input() title: string;
  @Output() onClose = new EventEmitter<boolean>();
  @ContentChild(DialogContentComponent) dialogContent: DialogContentComponent;
  prefix: string = `${CLASS_PREFIX}`;
  constructor(private el: ElementRef, private appRef: ApplicationRef) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.body.style.overflow = '';
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dialogContent;
    console.log(
      'DialogComponent -> ngAfterViewInit -> this.dialogContent',
      this.dialogContent.el.nativeElement.innerHTML
    );
  }

  close() {
    this.onClose.emit(false);
  }

  onDialogMaskClick(event: MouseEvent) {}
}
