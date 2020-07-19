import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataIndex } from '../../common/ts/constant';
import { Observable, throwError } from 'rxjs';
import { API } from '../../common/ts/constant';
import { AddressState, UsersAddressData } from './state/datatable.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  tableColIndex: string[][];

  constructor(private http: HttpClient) {
    this.tableColIndex = Object.entries(dataIndex);
  }

  getAddress() {
    return this.http.get(API.address.get);
  }
}
