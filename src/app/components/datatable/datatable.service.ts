import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DatatableService {
  selectedRowItems$ = new BehaviorSubject<Set<number>>(new Set());
  selectChanged$ = new BehaviorSubject<Array<any>>([]);
  rowsIndex = 0;
  rowsCount = 0;
  isFirstLoad$ = new BehaviorSubject<boolean>(true);
  fixColumnWidth = [];

  constructor() {
    // this.selectedRowItems$.next(this.selectedRowItems$.value.add(5));
    this.rowsIndex = 0;
  }

  selectRow($event, rowIndex) {
    // console.log($event.target.checked);
    // console.log(this.data[rowIndex]);
    if ($event.target.checked) {
      if (!this.selectedRowItems$.value.has(rowIndex)) {
        this.addSelectRow(rowIndex);
      }
    } else {
      this.selectedRowItems$.value.delete(rowIndex);
      this.selectedRowItems$.next(this.selectedRowItems$.value);
    }
    // this.selectChanged$.next(Array.from(this.selectedRowItems$.value.values()));
  }

  addSelectRow(rowIndex) {
    this.selectedRowItems$.next(this.selectedRowItems$.value.add(rowIndex));
  }

  clearAllSelectRows() {
    this.selectedRowItems$.value.clear();
    this.selectedRowItems$.next(this.selectedRowItems$.value);
  }

  getSelectRows() {
    return this.selectedRowItems$.asObservable();
  }
}

@Injectable()
export class DatatableRowService {
  tdCount = 0;
  constructor() {
    // this.selectedRowItems$.next(this.selectedRowItems$.value.add(5));
    this.tdCount = 0;
  }
}
