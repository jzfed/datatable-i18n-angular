import { Component, OnInit, ViewChild } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromAddressActions from './state/datatable.action';
import * as fromAddressSelector from './state/datatable.selector';
import { Observable } from 'rxjs';
import { DatatableContainerComponent } from './datatable-container/datatable-container.component';
@Component({
  templateUrl: './address-book.component.html',
  styleUrls: [
    './address-book.component.scss',
  ],
})
export class AddressBookComponent implements OnInit {
  isOpen: Observable<boolean>;

  @ViewChild(DatatableContainerComponent) tableContainer: DatatableContainerComponent;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.isOpen = this.store.pipe(select(fromAddressSelector.selectDialogStatus));
  }

  addNewAddress() {
    this.store.dispatch(fromAddressActions.addDialogOpen());
  }

  onDialogClose() {
    this.store.dispatch(fromAddressActions.addDialogClose());
  }
}
