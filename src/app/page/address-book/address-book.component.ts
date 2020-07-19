import { Component, OnInit } from '@angular/core';
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
import { Store, select } from '@ngrx/store';
import * as fromAddressActions from './state/datatable.action';
import * as fromAddressSelector from './state/datatable.selector';
import { Observable } from 'rxjs';
@Component({
  templateUrl: './address-book.component.html',
  styleUrls: [
    './address-book.component.scss',
  ],
})
export class AddressBookComponent implements OnInit {
  isOpen: Observable<boolean>;
  debugInfo: boolean = false;
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
  constructor(private fb: FormBuilder, private readonly store: Store) {}

  ngOnInit(): void {
    this.isOpen = this.store.pipe(select(fromAddressSelector.selectDialogStatus));
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

  addNewAddress() {
    this.store.dispatch(fromAddressActions.addDialogOpen());
  }

  onDialogClose() {
    this.store.dispatch(fromAddressActions.addDialogClose());
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

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    this.store.dispatch(fromAddressActions.addUserAddress({ payload: this.addNewAddressForm.value }));
    this.isOpen.subscribe((status) => {
      if (status === false) this.addNewAddressForm.reset();
    });
    console.log('form value', this.addNewAddressForm.value);
  }
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
