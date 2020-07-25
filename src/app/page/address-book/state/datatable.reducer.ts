import { createReducer, Action, on } from '@ngrx/store';
import * as fromAddressActions from './datatable.action';
import { fromJS, List, Map } from 'immutable';
import {
  AddressState,
  UsersAddressData,
  AddressAction,
  UserAddress,
  EditItemInfo,
  UpdateInfo,
} from './datatable.model';
import { from } from 'rxjs';

export const initialState: AddressState = fromJS({
  $$address: [],
  isLoading: false,
  isAddAddressDialogOpen: false,
});

const addressBookReducer = createReducer(
  initialState,
  on(
    fromAddressActions.fetchAddressData,
    fromAddressActions.deleteAddress,
    fromAddressActions.updateAddress,
    (state) => {
      return state.setIn(
        [
          'isLoading',
        ],
        true
      );
    }
  ),
  on(fromAddressActions.fetchDataSuccess, (state, action: AddressAction<any>) => {
    return state
      .setIn(
        [
          'isLoading',
        ],
        false
      )
      .updateIn(
        [
          '$$address',
        ],
        (list) => fromJS(action.payload)
      );
  }),
  on(fromAddressActions.deleteAddressSuccess, (state, action: AddressAction<any>) => {
    return state
      .setIn(
        [
          'isLoading',
        ],
        false
      )
      .updateIn(
        [
          '$$address',
        ],
        (list) => {
          return list.filter((item) => {
            const result = !action.payload.includes(item.get('id'));
            return result;
          });
        }
      );
  }),
  on(fromAddressActions.updateAddressSuccess, (state, action: AddressAction<UpdateInfo>) => {
    const { index, key, value } = action.payload;
    return state
      .setIn(
        [
          'isLoading',
        ],
        false
      )
      .setIn(
        [
          '$$address',
          index,
          key,
        ],
        value
      );
  }),
  on(
    fromAddressActions.fetchDataFailure,
    fromAddressActions.deleteAddressError,
    fromAddressActions.updateAddressError,
    (state) =>
      state.setIn(
        [
          'isLoading',
        ],
        false
      )
  ),
  on(fromAddressActions.addAddressSuccess, (state, action: AddressAction<any>) => {
    const payload = action.payload;
    const itemIndex =
      state.get('$$address').size > 0 ? state.get('$$address').maxBy((item) => item.get('id')).get('id') : 0;
    const newAddress: UserAddress = {
      id: itemIndex + 1,
      name: payload.name,
      location: payload.location,
      office: payload.office,
      officePhone: payload.phone.officePhone,
      cellPhone: payload.phone.cellPhone,
    };
    return state.updateIn(
      [
        '$$address',
      ],
      (list) => list.push(fromJS(newAddress))
    );
  }),
  on(fromAddressActions.addDialogClose, (state) =>
    state.setIn(
      [
        'isAddAddressDialogOpen',
      ],
      false
    )
  ),
  on(fromAddressActions.addDialogOpen, (state) =>
    state.setIn(
      [
        'isAddAddressDialogOpen',
      ],
      true
    )
  )
);

export function reducer(state: AddressState | undefined, action: Action) {
  return addressBookReducer(state, action);
}
