import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataIndex } from '../../common/ts/constant';
import { Observable, throwError } from 'rxjs';
import { API } from '../../common/ts/constant';
import { AddressState, UsersAddressData } from './state/datatable.model';
import { Store, select } from '@ngrx/store';
import * as fromAddressSelector from './state/datatable.selector';

@Injectable()
export class AddressService {
  tableColIndex: string[][];

  isOpen$: Observable<boolean>;
  deleteRowItems: Array<object> = [];

  constructor(private http: HttpClient, private readonly store: Store) {
    this.tableColIndex = Object.entries(dataIndex);
    this.isOpen$ = this.store.pipe(select(fromAddressSelector.selectDialogStatus));
  }

  getAddress() {
    return this.http.get(API.address.get);
  }

  addNewAddress(payload) {
    return this.http.post(API.address.post, payload);
  }
}
