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
  OnDestroy
} from '@angular/core';
import { CLASS_PREFIX } from '../../common/ts/constant';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { UsersAddressData, UserAddress } from 'src/app/common/ts/interface';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    './datatable.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DatatableComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() fixColumnWidth: Array<string>;
  @Input() tableColIndex;
  @Input() data: Array<UserAddress>;
  prefix: string = `${CLASS_PREFIX}table-wrapper`;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  constructor(private el: ElementRef, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(debounceTime(200));
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      this.fitTableSizeToScreen();
    });
  }

  ngAfterViewChecked() {
    console.log(
      'height',
      (this.el.nativeElement.firstElementChild as HTMLDivElement).querySelector('table').offsetHeight
    );
    this.fitTableSizeToScreen();
  }

  fitTableSizeToScreen() {
    const tableWrapperDOM = this.el.nativeElement.firstElementChild;
    const { top: tableWrapperTop }: DOMRect = tableWrapperDOM.getBoundingClientRect();
    const tbodyDOM: HTMLTableElement = (tableWrapperDOM as HTMLDivElement).querySelector('table tbody');
    const { top: tbodyTop, height: tbodyHeight } = tbodyDOM.getBoundingClientRect();
    const rowHeight = (tableWrapperDOM.querySelector('table tbody tr') as HTMLTableRowElement).offsetHeight;

    if (this.data.length > 0) {
      let maxBodyHeight: number = Math.floor(window.innerHeight - tableWrapperTop - tbodyTop - 2);
      let isOverflow = window.innerHeight < tbodyTop + tableWrapperTop + rowHeight * this.data.length;
      if (isOverflow) {
        tbodyDOM.style.height = `${maxBodyHeight}px`;
        tbodyDOM.style.display = 'block';
        console.log(maxBodyHeight);
      } else {
        tbodyDOM.style.height = ``;
        tbodyDOM.style.display = 'table';
      }
    }
  }
  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }
}
