import { List, Map } from 'immutable';

export interface UserAddress {
  id: number;
  name: string;
  location: string;
  office: string;
  officePhone: string;
  cellPhone: string;
}

export interface UsersAddressData {
  address: UserAddress[];
}

export interface AppState {
  $$datatable: AddressState;
}

export interface AddressState extends Map<string, any> {
  $$address: List<UserAddress>;
  isLoading: boolean;
}
