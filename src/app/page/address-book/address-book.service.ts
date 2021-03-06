import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataIndex } from '../../common/ts/constant';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { API } from '../../common/ts/constant';
import { AddressState, UsersAddressData, EditItemInfo, UpdateInfo } from './state/datatable.model';
import { Store, select } from '@ngrx/store';
import * as fromAddressSelector from './state/datatable.selector';

@Injectable()
export class AddressService {
  tableColIndex: string[][];
  selectedIds$: BehaviorSubject<Array<number>> = new BehaviorSubject([]);
  // isOpen$: Observable<boolean>;

  constructor(private http: HttpClient, private readonly store: Store) {
    this.tableColIndex = Object.entries(dataIndex);
    // this.isOpen$ = this.store.pipe(select(fromAddressSelector.selectDialogStatus));
  }

  setSelectIds(selectedIds) {
    this.selectedIds$.next(selectedIds);
  }

  getSelectIds() {
    return this.selectedIds$.asObservable();
  }

  //Request
  getAddress() {
    return this.http.get(API.address.get);
  }

  addNewAddress(payload) {
    return this.http.post(API.address.post, payload);
  }

  deleteAddress(deleteIds) {
    return this.http.delete(API.address.delete.replace('{userId}', deleteIds[0]));
  }

  updateAddress(editItemInfo: UpdateInfo) {
    return this.http.put(API.address.put.replace('{userId}', '1'), editItemInfo);
  }
}
