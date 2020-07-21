import { createSelector, select } from '@ngrx/store';
import { AppState, AddressState } from './datatable.model';
import { Map } from 'immutable';

export const selectAddressData = (state: AppState) => state.$$datatable;

export const selectAddressBook = createSelector(selectAddressData, (state: Map<string, any>) => {
  // console.log("selectAddressBook -> state.get('$$address') data type:", state.get('$$address').toJS().constructor.name);
  // console.log("selectAddressBook -> state.get('$$address')", state.get('$$address').toJS());
  //Keep the immutable date in the ngrx function. we need to convert the immutable object to normal javascript object to make sure that we don't make some bug in our component. Especially when we use the List and Map immutable object, we often need to check what typeof the data is? So we just keep the immutable data flow from action to reducer to selector, after the selector, the data will convert to normal javascript date type.
  return state.get('$$address').toJS();
});

export const selectLoadingStatus = createSelector(selectAddressData, (state: Map<string, boolean>) => {
  // console.log("selectLoadingStatus -> state.get('isLoading') data type:", state.get('isLoading').constructor.name);
  // console.log("selectLoadingStatus -> state.get('isLoading')", state.get('isLoading'));
  return state.get('isLoading');
});

export const selectDialogStatus = createSelector(selectAddressData, (state: Map<string, boolean>) => {
  return state.get('isAddAddressDialogOpen');
});
