import {
  Component,
  OnInit,
  ViewRef,
  ViewContainerRef,
  QueryList,
  ContentChildren,
  TemplateRef,
  ViewChild,
  EmbeddedViewRef,
  AfterViewInit,
  AfterContentInit,
  OnDestroy,
  Input
} from '@angular/core';
import { DatatableTdComponent } from './datatable-td.component';
import { DatatableService, DatatableRowService } from './datatable.service';

@Component({
  selector: 'app-datatable-row',
  template: `
      <div class="datatable-td datatable-checkbox">
        <input
          type="checkbox"
          [checked]="isChecked"
          (change)="selectRow($event)"
        />
      </div>
      <ng-content></ng-content>
  `,
  host: {
    '[class.datatable-row]': 'true',
    '[class.selected]': 'this.isSelected',
    '[class.new-add]': 'this.isNewAdd'
  },
  providers: [
    DatatableRowService
  ]
})
export class DatatableRowComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  rowIndex: number;
  trView: EmbeddedViewRef<void>;
  isChecked: boolean = false;
  isSelected: boolean = false;
  isNewAdd = false;
  // @ViewChild('trTemplate') templateRef: TemplateRef<void>;
  // @ViewChild('dispalyContentTds', { read: ViewContainerRef })
  // dispalyContentTds: ViewContainerRef;
  // @ContentChildren(DatatableTdComponent) contentTds: QueryList<DatatableTdComponent>;

  constructor(public vcr: ViewContainerRef, public datatableService: DatatableService) {
    this.rowIndex = this.datatableService.rowsIndex++;
  }

  ngOnInit(): void {
    this.datatableService.getSelectRows().subscribe((selectRowsSet) => {
      this.isChecked = selectRowsSet.has(this.rowIndex);
      this.isSelected = selectRowsSet.has(this.rowIndex);
    });
    this.isNewAdd = this.rowIndex === this.datatableService.rowsCount && !this.datatableService.isFirstLoad$.value;
  }

  selectRow($event) {
    this.datatableService.selectRow($event, this.rowIndex);
  }

  ngAfterContentInit() {}

  ngAfterViewInit() {
    // this.trView = this.templateRef.createEmbeddedView(null);
    // this.contentTds.changes.subscribe(() => {
    //   this.dispalyContentTds.clear();
    //   this.contentTds.forEach((tdItem) => {
    //     this.dispalyContentTds.insert(tdItem.tdView);
    //   });
    //   console.log('DatatableRowComponent -> ngAfterViewInit -> this.contentTds', this.contentTds);
    // });
  }

  ngOnDestroy() {
    // this.trView.destroy();
  }
}
