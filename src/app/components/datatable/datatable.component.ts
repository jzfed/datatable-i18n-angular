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
  ViewContainerRef,
  ContentChildren,
  ComponentFactoryResolver,
  ViewRef,
  TemplateRef,
  Host,
} from '@angular/core';
import { CLASS_PREFIX } from '../../common/ts/constant';
import { Observable, Subscription, fromEvent } from 'rxjs';
// import { UsersAddressData, UserAddress } from 'src/app/state/datatable.model';
import { debounceTime } from 'rxjs/operators';
import { DatatableRowComponent } from './datatable-row.component';
import { DatatableService } from './datatable.service';
import { DatatableRowDirective } from './datatable-row.directive';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    './datatable.component.scss',
  ],
  providers: [
    DatatableService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DatatableComponent
  implements OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, OnChanges, OnDestroy {
  @Input() fixColumnWidth: Array<string>;
  @Input() tableColIndex;
  @Input() data: Array<any>;
  @Output() selectChanged = new EventEmitter<Array<any>>();
  @Output() viewUpdated = new EventEmitter();
  @ViewChild('tbodyRef', { static: true })
  tbodyRef: ElementRef;
  @ContentChildren(DatatableRowComponent, { read: DatatableRowComponent })
  rows: QueryList<DatatableRowComponent>;
  // @ViewChild('displayContentRows', { read: ViewContainerRef })
  // displayContentRowsVcr: ViewContainerRef;
  // @ContentChildren(DatatableRowDirective) contentRows: QueryList<DatatableRowDirective>;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  maxBodyHeight: number = 0;
  tbodyDOM: HTMLTableElement;
  scrollBarWidth: number;
  selectedDataItems: Array<any>;

  constructor(
    private el: ElementRef,
    private changeDetector: ChangeDetectorRef,
    private cfr: ComponentFactoryResolver,
    @Host() private datatableService: DatatableService
  ) {}

  ngOnInit() {
    this.datatableService.fixColumnWidth = this.fixColumnWidth;
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(debounceTime(200));
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      this.fitTableSizeToScreen();
    });
    this.datatableService.getSelectRows().subscribe(() => {
      const selectedIndexs = Array.from(this.datatableService.selectedRowItems$.value.values());
      this.selectedDataItems = this.data.filter((dataItem, index) => selectedIndexs.includes(index));
      this.selectChanged.emit(this.selectedDataItems);
    });
  }

  ngOnChanges(changes) {
    console.log('DatatableComponent -> ngOnChanges -> changes', changes);
  }

  ngAfterContentInit() {
    // this.contentRows.changes.subscribe(() => {
    //   this.displayContentRowsVcr.clear();
    //   this.contentRows.forEach((rowItem) => {
    //     // this.displayContentRowsVcr.insert(null);
    //   });
    //   console.log('DatatableComponent -> ngAfterViewInit -> this.contentRows', this.contentRows);
    // });
  }

  ngAfterViewInit() {
    // const factory = this.cfr.resolveComponentFactory();
    // this.displayContentRowsVcr.insert(this.contentRows.first.vcr.get(0));
    // this.contentRows.forEach((rowItem) => {});
    // const comFactory = this.cfr.resolveComponentFactory(DatatableRowComponent);
    // this.displayContentRowsVcr.createComponent(comFactory);
    this.tbodyDOM = this.tbodyRef.nativeElement;

    this.rows.changes.subscribe(() => {
      this.datatableService.rowsCount = 0;
      this.fitTableSizeToScreen();
      this.viewUpdated.emit();
      console.log('ngAfterViewInit -> this.rows', this.rows);
    });
  }

  ngAfterViewChecked() {
    // console.log('DatatableComponent -> ngAfterViewChecked -> this.tbodyDOM', this.tbodyDOM);
    this.fitTableSizeToScreen();
  }

  fitTableSizeToScreen() {
    const tableWrapperDOM = this.el.nativeElement.parentElement;
    const tbodyDOM = this.tbodyDOM;
    const { top: tableWrapperTop }: DOMRect = tableWrapperDOM.getBoundingClientRect();
    const { top: tbodyTop } = tbodyDOM.getBoundingClientRect();

    if (this.data.length > 0) {
      const rowHeight = this.rows.first.vcr.element.nativeElement.offsetHeight;
      let maxBodyHeight: number = Math.floor(window.innerHeight - tableWrapperTop - tbodyTop - 2);
      let isOverflow = window.innerHeight < tbodyTop + tableWrapperTop + rowHeight * this.data.length;
      if (isOverflow) {
        // tbodyDOM.style.height = `${maxBodyHeight}px`;
        this.maxBodyHeight = maxBodyHeight;
        this.scrollBarWidth =
          tbodyDOM.scrollHeight > tbodyDOM.offsetHeight && tbodyDOM.scrollHeight > 0
            ? tbodyDOM.offsetWidth - tbodyDOM.clientWidth
            : 0;
      } else {
        this.maxBodyHeight = 0;
      }

      this.changeDetector.detectChanges();
      // console.log('DatatableComponent -> fitTableSizeToScreen -> tbodyDOM', this.tbodyDOM);
      // console.log('DatatableComponent -> fitTableSizeToScreen -> this.maxBodyHeight', this.maxBodyHeight);
    }
  }

  scrollToBottom() {
    const rowHeight = this.rows.first.vcr.element.nativeElement.offsetHeight;
    this.tbodyDOM.scrollTo(0, this.tbodyDOM.scrollHeight + rowHeight);
  }

  selectAll($event) {
    const isChecked = $event.target.checked;
    if (isChecked) {
      this.data.forEach((item, index) => {
        this.datatableService.addSelectRow(index);
      });
    } else {
      this.clearAllSelected();
    }
    // this.selectChanged.emit(Array.from(this.selectedRowItems.values()));
  }

  clearAllSelected() {
    this.datatableService.clearAllSelectRows();
    this.selectedDataItems.length = 0;
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
    this.tbodyDOM = null;
    this.selectedDataItems.length = 0;
  }
}
