import { createAction, Action, props } from '@ngrx/store';
import { AddressState, UsersAddressData, EditItemInfo, UpdateInfo } from './datatable.model';

export const DATATABLE_ADD = '[DataTable] ADD';
export const DATATABLE_ADD_SUCCESS = '[DataTable] ADD/SUCCESS';
export const DATATABLE_ADD_ERROR = '[DataTable] ADD/ERROR';
export const DATATABLE_UPDATE = '[DataTable] UPDATE';
export const DATATABLE_UPDATE_SUCCESS = '[DataTable] UPDATE/SUCCESS';
export const DATATABLE_UPDATE_ERROR = '[DataTable] UPDATE/ERROR';
export const DATATABLE_DELETE = '[DataTable] DELETE';
export const DATATABLE_DELETE_SUCCESS = '[DataTable] DELETE/SUCCESS';
export const DATATABLE_DELETE_ERROR = '[DataTable] DELETE/ERROR';
export const DATATABLE_SORT = '[DataTable] SORT';
export const DATATABLE_FETCH = '[DataTable] FETCH';
export const DATATABLE_FETCH_ERROR = '[DataTable] FETCH/ERROR';
export const DATATABLE_FETCH_SUCCESS = '[DataTable] FETCH/SUCCESS';

export const NEW_DIALOG_OPEN = '[DIALOG] OPEN';
export const NEW_DIALOG_CLOSE = '[DIALOG] CLOSE';

//Fetch
export const fetchDataSuccess = createAction(DATATABLE_FETCH_SUCCESS, props<{ payload: any }>());
export const fetchDataFailure = createAction(DATATABLE_FETCH_ERROR, props<{ payload: any }>());
export const fetchAddressData = createAction(DATATABLE_FETCH);

//Add
export const addAddress = createAction(DATATABLE_ADD, props<{ payload: any }>());
export const addAddressSuccess = createAction(DATATABLE_ADD_SUCCESS, props<{ payload: any }>());
export const addAddressError = createAction(DATATABLE_ADD_ERROR, props<{ payload: any }>());

//Update
export const updateAddress = createAction(DATATABLE_UPDATE, props<{ payload: UpdateInfo }>());
export const updateAddressSuccess = createAction(DATATABLE_UPDATE_SUCCESS, props<{ payload: UpdateInfo }>());
export const updateAddressError = createAction(DATATABLE_UPDATE_ERROR);

//Delete
export const deleteAddress = createAction(DATATABLE_DELETE, props<{ payload: Object }>());
export const deleteAddressSuccess = createAction(DATATABLE_DELETE_SUCCESS, props<{ payload: Object }>());
export const deleteAddressError = createAction(DATATABLE_DELETE_ERROR);

//Sort
export const sortUserAddress = createAction(DATATABLE_SORT, props<{ payload: Object }>());

//Dialog
export const addDialogOpen = createAction(NEW_DIALOG_OPEN);
export const addDialogClose = createAction(NEW_DIALOG_CLOSE);
