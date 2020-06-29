import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { API } from '../common/ts/constant';
import { AddressState, UsersAddressData } from '../common/ts/interface';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) {}

  getAddress() {
    return this.http.get(API.address.get);
  }
}
