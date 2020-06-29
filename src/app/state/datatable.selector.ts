import { createSelector, select } from '@ngrx/store';
import { AppState, AddressState } from '../common/ts/interface';
import { Map } from 'immutable';

export const selectAddressData = (state: AppState) => state.$$datatable;

export const selectAddressBook = createSelector(selectAddressData, (state: Map<string, any>) => {
  console.log('selectAddressBook', state.get('$$address'));
  return state.get('$$address');
});
