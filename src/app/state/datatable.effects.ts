import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddressService } from '../service/address.service';
import * as AddressActions from '../state/datatable.action';
import { mergeMap, switchMap, map, catchError, tap, timeout } from 'rxjs/operators';
import { of, from } from 'rxjs';
@Injectable()
export class AddressBookEffects {
  loadAddressBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressActions.DATATABLE_FETCH),
      switchMap(() =>
        this.addressService.getAddress().pipe(
          map((data) => AddressActions.fetchDataSuccess({ payload: data })),
          tap((data) => console.log('AddressBookEffects -> addressService -> data', data)),
          timeout(5000),
          catchError((err) => {
            alert(err.message);
            return of(AddressActions.fetchDataFailure({ payload: err.message }));
          })
        )
      )
    );
  });

  constructor(private actions$: Actions, private addressService: AddressService) {}
}
