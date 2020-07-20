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
  QueryList,
  Output,
  EventEmitter,
} from '@angular/core';
import { CLASS_PREFIX } from '../../common/ts/constant';
import { Observable, Subscription, fromEvent } from 'rxjs';
// import { UsersAddressData, UserAddress } from 'src/app/state/datatable.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    './datatable.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DatatableComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, OnChanges {
  @Input() fixColumnWidth: Array<string>;
  @Input() tableColIndex;
  @Input() data: Array<any>;
  @Output() selectChanged = new EventEmitter<Array<any>>();
  @Output() viewUpdated = new EventEmitter();
  @ViewChild('tbodyRef', { static: false })
  tbodyRef: ElementRef;
  @ViewChildren('rowsRef') rowsRef: QueryList<ElementRef>;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  maxBodyHeight: number = 0;
  selectedRowItems: Map<number, any> = new Map();
  tbodyDOM: HTMLTableElement;

  constructor(private el: ElementRef, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(debounceTime(200));
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      this.fitTableSizeToScreen();
    });
  }

  ngOnChanges(changes) {
    console.log('DatatableComponent -> ngOnChanges -> changes', changes);
  }

  ngAfterViewInit() {
    this.tbodyDOM = this.tbodyRef.nativeElement;
    this.fitTableSizeToScreen();
    console.log('DatatableComponent -> ngAfterViewInit -> this.rowsRef', this.rowsRef.toArray());
  }

  ngAfterViewChecked() {
    // console.log('DatatableComponent -> ngAfterViewChecked -> this.tbodyDOM', this.tbodyDOM);
    this.fitTableSizeToScreen();
    this.viewUpdated.emit();
  }

  fitTableSizeToScreen() {
    const tableWrapperDOM = this.el.nativeElement.parentElement;
    const { top: tableWrapperTop }: DOMRect = tableWrapperDOM.getBoundingClientRect();
    const { top: tbodyTop } = this.tbodyDOM.getBoundingClientRect();

    if (this.data.length > 0) {
      const rowHeight = this.rowsRef.first.nativeElement.offsetHeight;
      let maxBodyHeight: number = Math.floor(window.innerHeight - tableWrapperTop - tbodyTop - 2);
      let isOverflow = window.innerHeight < tbodyTop + tableWrapperTop + rowHeight * this.data.length;
      if (isOverflow) {
        // tbodyDOM.style.height = `${maxBodyHeight}px`;
        this.maxBodyHeight = maxBodyHeight;
      } else {
        this.maxBodyHeight = 0;
      }

      this.changeDetector.detectChanges();
      // console.log('DatatableComponent -> fitTableSizeToScreen -> tbodyDOM', this.tbodyDOM);
      // console.log('DatatableComponent -> fitTableSizeToScreen -> this.maxBodyHeight', this.maxBodyHeight);
    }
  }

  scrollToBottom() {
    const rowHeight = this.rowsRef.first.nativeElement.offsetHeight;
    this.tbodyDOM.scrollTo(0, this.tbodyDOM.scrollHeight + rowHeight);
  }

  selectAll($event) {
    const isChecked = $event.target.checked;
    if (isChecked) {
      this.data.forEach((item, index) => {
        this.selectedRowItems.set(index, item);
      });
    } else {
      this.selectedRowItems.clear();
    }
    this.selectChanged.emit(Array.from(this.selectedRowItems.values()));
  }

  selectRow($event, rowIndex) {
    // console.log($event.target.checked);
    // console.log(this.data[rowIndex]);
    if ($event.target.checked) {
      if (!this.selectedRowItems.has(rowIndex)) {
        this.selectedRowItems.set(rowIndex, this.data[rowIndex]);
      }
    } else {
      this.selectedRowItems.delete(rowIndex);
    }
    this.selectChanged.emit(Array.from(this.selectedRowItems.values()));
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
    this.tbodyDOM = null;
    this.selectedRowItems.clear();
  }
}
