import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromAddressActions from './state/datatable.action';
import * as fromAddressSelector from './state/datatable.selector';
import { Observable, forkJoin, Subscription, combineLatest, Subject } from 'rxjs';
import { DatatableContainerComponent } from './datatable-container/datatable-container.component';
import { UsersAddressData } from './state/datatable.model';
import { AddressService } from './address-book.service';
import { tap, takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  templateUrl: './address-book.component.html',
  styleUrls: [
    './address-book.component.scss',
  ],
})
export class AddressBookComponent implements OnInit, OnDestroy {
  isOpen$: Observable<boolean>;
  canAdd: boolean = true;
  canEdit: boolean = false;
  canUpdate: boolean = false;
  canDelete: boolean = false;
  canSort: boolean = false;
  tableColIndex: string[][];
  data: Observable<Array<UsersAddressData>>;
  isInput: boolean;
  logicControlSubscription: Subscription;
  destroyed$ = new Subject<boolean>();

  @ViewChild(DatatableContainerComponent) tableContainer: DatatableContainerComponent;

  constructor(private readonly store: Store, public addressService: AddressService, private action$: Actions) {}

  ngOnInit(): void {
    this.isOpen$ = this.store.pipe(select(fromAddressSelector.selectDialogStatus));
    this.data = this.store.pipe(select(fromAddressSelector.selectAddressBook));
    this.tableColIndex = this.addressService.tableColIndex;
    this.store.dispatch(fromAddressActions.fetchAddressData());
    // this.addressService.getSelectIds().subscribe((selectedIds) => {
    //   console.log(selectedIds);
    // });
    this.logicControlSubscription = combineLatest([
      this.addressService.getSelectIds(),
      this.isOpen$,
    ]).subscribe(([ selectedIds, isOpen
    ]) => {
      this.canAdd = selectedIds.length === 0;
      this.canDelete = selectedIds.length > 0;
      this.canEdit = selectedIds.length === 0 && !isOpen;
      this.canUpdate = selectedIds.length === 0 && !isOpen;
      this.canSort = selectedIds.length === 0;
    });

    this.action$
      .pipe(
        ofType(fromAddressActions.DATATABLE_DELETE_SUCCESS),
        takeUntil(this.destroyed$),
        tap(() => {
          this.tableContainer.table.clearAllSelected();
        })
      )
      .subscribe();
  }

  selectItem(selectedDataItems) {
    const selectedIds = selectedDataItems.map((item) => item.id);
    this.addressService.setSelectIds(selectedIds);
    // console.log(selectedIds);
  }

  deleteAddress() {
    const selectedIds = this.addressService.selectedIds$.value;
    this.store.dispatch(fromAddressActions.deleteAddress({ payload: selectedIds }));
  }

  addNewAddress() {
    this.store.dispatch(fromAddressActions.addDialogOpen());
  }

  handleAddSuccess() {
    this.store.dispatch(fromAddressActions.addDialogClose());
    setTimeout(() => this.tableContainer.table.scrollToBottom(), 0);
  }

  handleDialogClose() {
    this.store.dispatch(fromAddressActions.addDialogClose());
  }

  ngOnDestroy() {
    this.logicControlSubscription.unsubscribe();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
