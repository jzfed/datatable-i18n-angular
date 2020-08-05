import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromAddressActions from './state/datatable.action';
import * as fromAddressSelector from './state/datatable.selector';
import { Observable, forkJoin, Subscription, combineLatest, Subject, of, BehaviorSubject } from 'rxjs';
import { DatatableContainerComponent } from './datatable-container/datatable-container.component';
import { UsersAddressData, EditItemInfo, UpdateInfo } from './state/datatable.model';
import { AddressService } from './address-book.service';
import { tap, takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { AddAddressFormComponent } from './add-address-form/add-address-form.component';

@Component({
  templateUrl: './address-book.component.html',
  styleUrls: [
    './address-book.component.scss'
  ]
})
export class AddressBookComponent implements OnInit, OnDestroy {
  isOpen$: Observable<boolean>;
  canAdd: boolean = true;
  canEdit: boolean = false;
  canUpdate: boolean = false;
  canDelete: boolean = false;
  canSort: boolean = false;
  tableColIndex: string[][];
  data$: Observable<Array<UsersAddressData>>;
  isInput: boolean;
  editItem$: BehaviorSubject<EditItemInfo> = new BehaviorSubject<EditItemInfo>(null);
  updateItem$: BehaviorSubject<EditItemInfo> = new BehaviorSubject<EditItemInfo>(null);
  logicControlSubscription: Subscription;
  destroyed$ = new Subject<boolean>();

  @ViewChild(DatatableContainerComponent) tableContainer: DatatableContainerComponent;
  @ViewChild(AddAddressFormComponent) addressForm: AddAddressFormComponent;

  constructor(private readonly store: Store, public addressService: AddressService, private action$: Actions) {}

  ngOnInit(): void {
    this.isOpen$ = this.store.pipe(select(fromAddressSelector.selectDialogStatus));
    this.data$ = this.store.pipe(select(fromAddressSelector.selectAddressBook));
    this.tableColIndex = this.addressService.tableColIndex;
    this.store.dispatch(fromAddressActions.fetchAddressData());
    // this.addressService.getSelectIds().subscribe((selectedIds) => {
    //   console.log(selectedIds);
    // });
    this.logicControlSubscription = combineLatest([
      this.addressService.getSelectIds(),
      this.isOpen$,
      this.editItem$.asObservable(),
      this.updateItem$.asObservable()
    ]).subscribe(([ selectedIds, isOpen, editItem, updateItem
    ]) => {
      this.canAdd = selectedIds.length === 0 && updateItem === null;
      this.canDelete = selectedIds.length > 0;
      this.canEdit = editItem !== null && selectedIds.length === 0 && !isOpen;
      this.canUpdate = selectedIds.length === 0 && !isOpen && editItem === null && updateItem !== null;
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

  selectEditItem($event, editItemInfo: EditItemInfo) {
    this.editItem$.next({ ...editItemInfo });
  }

  doubleClickEditItem($event, editItemInfo: EditItemInfo) {
    this.updateItem$.next({ ...editItemInfo });
    this.clearEditItem();
    setTimeout(() => this.updateItem$.value.inputEl.inputDom.nativeElement.focus(), 0);
  }

  updateSelectEditItem() {
    this.updateItem$.next({ ...this.editItem$.value });
    this.clearEditItem();
    setTimeout(() => this.updateItem$.value.inputEl.inputDom.nativeElement.focus(), 0);
  }

  handleInputValueChange($event) {
    this.updateItem$.next({ ...this.updateItem$.value, updateValue: $event.target.value || '' });
    // console.log($event.target.value);
  }

  cancelUpdate() {
    this.clearUpdateItem();
  }

  saveUpdateItem() {
    const payloadData: UpdateInfo = {
      id: this.updateItem$.value.updateItemId,
      index: this.updateItem$.value.updateItemIndex,
      key: this.updateItem$.value.editColumnKey,
      value: this.updateItem$.value.updateValue
    };
    this.store.dispatch(fromAddressActions.updateAddress({ payload: payloadData }));
    this.clearUpdateItem();
  }

  clearUpdateItem() {
    this.updateItem$.next(null);
  }

  clearEditItem() {
    this.editItem$.next(null);
  }

  selectRowItem(selectedDataItems) {
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

  handleAddAddressSuccess() {
    this.store.dispatch(fromAddressActions.addDialogClose());
    setTimeout(() => this.tableContainer.table.scrollToBottom(), 0);
  }

  handleDialogClose() {
    this.store.dispatch(fromAddressActions.addDialogClose());
    this.addressForm.resetForm();
  }

  ngOnDestroy() {
    this.logicControlSubscription.unsubscribe();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
