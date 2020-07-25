import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import * as fromAddressSelector from '../state/datatable.selector';
import * as fromAddressActions from '../state/datatable.action';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-address-form',
  templateUrl: './add-address-form.component.html',
  styleUrls: [
    './add-address-form.component.scss',
  ],
})
export class AddAddressFormComponent implements OnInit, OnDestroy {
  debugInfo: boolean = false;
  destroyed$ = new Subject<boolean>();
  @Output() onCancel = new EventEmitter();
  @Output() onSubmitSuccess = new EventEmitter();
  // addNewAddressForm = new FormGroup({
  //   name: new FormControl(''),
  //   location: new FormControl('location'),
  //   office: new FormControl(''),
  //   phone: new FormGroup({
  //     officePhone: new FormControl(''),
  //     cellPhone: new FormControl(''),
  //   })
  // });
  addNewAddressForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          forbiddenNameValidator(/jason/i),
        ],
      ],
      location: [
        '',
        [
          Validators.required,
        ],
      ],
      office: [
        '',
        [
          Validators.required,
        ],
      ],
      phone: this.fb.group({
        officePhone: [
          '',
          Validators.minLength(8),
        ],
        cellPhone: [
          '',
          Validators.minLength(8),
        ],
      }),
      aliases: this.fb.array(
        [
          this.fb.control(''),
        ],
        { updateOn: 'blur' }
      ),
    },
    { validators: identityRevealedValidator }
  );

  constructor(private fb: FormBuilder, private readonly store: Store, private action$: Actions) {}

  ngOnInit(): void {
    this.action$
      .pipe(
        ofType(fromAddressActions.addAddressSuccess),
        takeUntil(this.destroyed$),
        tap(() => {
          this.addNewAddressForm.reset();
          this.onSubmitSuccess.emit();
        })
      )
      .subscribe();
  }

  get name() {
    return this.addNewAddressForm.get('name');
  }

  get location() {
    return this.addNewAddressForm.get('location');
  }

  get office() {
    return this.addNewAddressForm.get('office');
  }

  get officePhone() {
    return this.addNewAddressForm.get('phone').get('officePhone');
  }

  get cellPhone() {
    return this.addNewAddressForm.get('phone').get('cellPhone');
  }

  get aliases() {
    return this.addNewAddressForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit($event) {
    this.store.dispatch(fromAddressActions.addAddress({ payload: this.addNewAddressForm.value }));
    console.log('form value', this.addNewAddressForm.value);
  }

  handlerCancel() {
    this.addNewAddressForm.reset();
    this.onCancel.emit(null);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  // setNameValueJason() {
  //   this.addNewAddressForm.controls['name'].setValue('Jason');
  // }

  // patchValue() {
  //   this.addNewAddressForm.patchValue({
  //     name: 'Jason Zhang',
  //     phone: {
  //       cellPhone: '1115566678',
  //     },
  //   });
  // }
}

export const forbiddenNameValidator = (reg: RegExp): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = reg.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
};

export const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const name = control.get('name');
  const location = control.get('location');
  return name && location && name.valid && location.value === name.value ? { identityRevealed: true } : null;
};
