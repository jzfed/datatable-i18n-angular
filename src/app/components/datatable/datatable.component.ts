import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ElementRef,
  OnChanges,
  AfterViewChecked,
  AfterContentInit,
  AfterViewInit,
  AfterContentChecked,
  DoCheck,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
  ViewChildren,
  QueryList
} from '@angular/core';
import { CLASS_PREFIX } from '../../common/ts/constant';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { UsersAddressData, UserAddress } from 'src/app/common/ts/interface';
import { debounceTime } from 'rxjs/operators';
import { List } from 'immutable';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    './datatable.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DatatableComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, OnChanges {
  @Input() fixColumnWidth: Array<string>;
  @Input() tableColIndex;
  @Input() source: List<UserAddress>;
  @ViewChild('tbodyRef', { static: false })
  tbodyRef: ElementRef;
  @ViewChildren('rowsRef') rowsRef: QueryList<ElementRef>;
  data: Array<UserAddress>;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  maxBodyHeight: string;
  tbodyDOM: HTMLTableElement;

  constructor(private el: ElementRef, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.data = this.source.toJS();
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(debounceTime(200));
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      this.fitTableSizeToScreen();
    });
  }

  ngOnChanges(changes) {
    this.data = this.source.toJS();
    console.log('DatatableComponent -> ngOnChanges -> changes', changes);
  }

  ngAfterViewInit() {
    this.tbodyDOM = this.tbodyRef.nativeElement;
    this.fitTableSizeToScreen();
    console.log('DatatableComponent -> ngAfterViewInit -> this.rowsRef', this.rowsRef.toArray());
  }

  ngAfterViewChecked() {
    console.log('DatatableComponent -> ngAfterViewChecked -> this.tbodyDOM', this.tbodyDOM);
    this.fitTableSizeToScreen();
    this.changeDetector.detectChanges();
  }

  fitTableSizeToScreen() {
    const tableWrapperDOM = this.el.nativeElement.firstElementChild;
    const { top: tableWrapperTop }: DOMRect = tableWrapperDOM.getBoundingClientRect();
    const { top: tbodyTop } = this.tbodyDOM.getBoundingClientRect();

    if (this.data.length > 0) {
      const rowHeight = this.rowsRef.first.nativeElement.offsetHeight;
      let maxBodyHeight: number = Math.floor(window.innerHeight - tableWrapperTop - tbodyTop - 2);
      let isOverflow = window.innerHeight < tbodyTop + tableWrapperTop + rowHeight * this.data.length;
      if (isOverflow) {
        // tbodyDOM.style.height = `${maxBodyHeight}px`;
        this.maxBodyHeight = `${maxBodyHeight}px`;
        console.log('DatatableComponent -> fitTableSizeToScreen -> tbodyDOM', this.tbodyDOM);
        console.log('DatatableComponent -> fitTableSizeToScreen -> this.maxBodyHeight', this.maxBodyHeight);
      } else {
        this.maxBodyHeight = ``;
      }
    }
  }
  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }
}
