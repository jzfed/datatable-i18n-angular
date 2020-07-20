import { createReducer, Action, on } from '@ngrx/store';
import * as fromAddressActions from './datatable.action';
import { fromJS, List, Map } from 'immutable';
import { AddressState, UsersAddressData, AddressAction, UserAddress } from './datatable.model';
import { from } from 'rxjs';

export const initialState: AddressState = fromJS({
  $$address: [],
  isLoading: false,
  isAddAddressDialogOpen: false,
});

const addressBookReducer = createReducer(
  initialState,
  on(fromAddressActions.fetchAddressData, (state) => {
    return state.setIn(
      [
        'isLoading',
      ],
      true
    );
  }),
  on(fromAddressActions.fetchDataSuccess, (state, action: AddressAction) => {
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
  on(fromAddressActions.fetchDataFailure, (state) =>
    state.setIn(
      [
        'isLoading',
      ],
      false
    )
  ),
  on(fromAddressActions.addUserAddressSuccess, (state, action: AddressAction) => {
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
