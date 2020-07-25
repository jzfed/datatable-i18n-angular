import { List, Map } from 'immutable';
import { Action } from '@ngrx/store';
import { ElementRef, ViewContainerRef } from '@angular/core';
import { InputComponent } from 'src/app/components/input/input.component';

export interface UserAddress {
  id: number;
  name: string;
  location: string;
  office: string;
  officePhone: string;
  cellPhone: string;
}

export interface UsersAddressData {
  address: List<UserAddress>;
}

export interface AppState {
  $$datatable: AddressState;
}

export interface AddressAction<T> extends Action {
  payload?: T;
}

export interface AddressState extends Map<string, any> {
  $$address: List<UserAddress>;
  isLoading: boolean;
  isAddAddressDialogOpen: boolean;
}

export interface UpdateInfo {
  id: number;
  index: number;
  key: string;
  value: any;
}

export interface EditItemInfo {
  updateItemId: number;
  updateItemIndex: number;
  editColumnKey: string;
  originalValue: any;
  inputEl: InputComponent;
  updateValue?: any;
}
