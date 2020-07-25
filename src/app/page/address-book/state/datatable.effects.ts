import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddressService } from '../address-book.service';
import * as fromAddressActions from '../state/datatable.action';
import { mergeMap, switchMap, map, catchError, tap, timeout } from 'rxjs/operators';
import { of, from, EMPTY } from 'rxjs';
import { AddressAction } from './datatable.model';
@Injectable()
export class AddressBookEffects {
  constructor(private actions$: Actions, private addressService: AddressService) {}

  loadAddressBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAddressActions.DATATABLE_FETCH),
      switchMap(() => {
        return this.addressService
          .getAddress()
          .pipe(
            map((data) => fromAddressActions.fetchDataSuccess({ payload: data })),
            tap((data) => console.log('AddressBookEffects -> addressService -> data', data)),
            timeout(5000),
            catchError((err) => of(fromAddressActions.fetchDataFailure({ payload: err })))
          );
      })
    );
  });

  addNewAddress$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAddressActions.DATATABLE_ADD),
      switchMap((action: AddressAction) => {
        return this.addressService
          .addNewAddress({ payload: action.payload })
          .pipe(
            map((data) => fromAddressActions.addAddressSuccess({ payload: action.payload })),
            catchError((err) => of(fromAddressActions.addAddressError({ payload: err })))
          );
      })
    );
  });

  deleteAddress$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAddressActions.DATATABLE_DELETE),
      switchMap((action: AddressAction) => {
        return this.addressService
          .deleteAddress(action.payload)
          .pipe(
            map(() => fromAddressActions.deleteAddressSuccess({ payload: action.payload })),
            catchError((err) => of(fromAddressActions.deleteAddressError()))
          );
      })
    );
  });
}
