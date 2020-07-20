import { List, Map } from 'immutable';
import { Action } from '@ngrx/store';

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

export interface AddressAction extends Action {
  payload?: any;
}

export interface AddressState extends Map<string, any> {
  $$address: List<UserAddress>;
  isLoading: boolean;
  isAddAddressDialogOpen: boolean;
}
