import { createReducer, Action, on } from '@ngrx/store';
import * as fromAddressActions from './datatable.action';
import { fromJS, List, Map } from 'immutable';
import { AddressState, UsersAddressData } from './datatable.model';

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
  on(fromAddressActions.fetchDataSuccess, (state, action: Action) => {
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
        (list) => fromJS((action as any).payload)
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
  on(fromAddressActions.addUserAddressSuccess, fromAddressActions.addDialogClose, (state) =>
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
