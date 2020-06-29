import { createReducer, Action, on } from '@ngrx/store';
import * as AddressBookActions from './datatable.action';
import { fromJS, List, Map } from 'immutable';
import { AddressState, UsersAddressData } from '../common/ts/interface';

export const initialState: AddressState = fromJS({
  $$address: [],
  isLoading: false
});

const addressBookReducer = createReducer(
  initialState,
  on(AddressBookActions.fetchDataStarted, (state) => {
    return state.setIn(
      [
        'isLoading'
      ],
      true
    );
  }),
  on(AddressBookActions.fetchDataSuccess, (state, action: Action) => {
    console.log('Get success data:', action);
    return state
      .setIn(
        [
          'isLoading'
        ],
        false
      )
      .updateIn(
        [
          '$$address'
        ],
        (list) => (action as any).payload
      );
  }),
  on(AddressBookActions.fetchDataFailure, (state) =>
    state.setIn(
      [
        'isLoading'
      ],
      false
    )
  )
);

export function reducer(state: AddressState | undefined, action: Action) {
  return addressBookReducer(state, action);
}
