import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddressService } from '../service/address.service';
import * as AddressActions from '../state/datatable.action';
import { mergeMap, switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class AddressBookEffects {
  loadAddressBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressActions.DATATABLE_FETCH),
      switchMap(() =>
        this.addressService
          .getAddress()
          .pipe(
            map((data) => AddressActions.fetchDataSuccess({ payload: data })),
            tap((data) => console.log('response data:', data)),
            catchError((err) => of(AddressActions.fetchDataFailure(err)))
          )
      )
    );
  });

  constructor(private actions$: Actions, private addressService: AddressService) {}
}
