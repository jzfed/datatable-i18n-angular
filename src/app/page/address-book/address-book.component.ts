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

@Component({
  templateUrl: './address-book.component.html',
  styleUrls: [
    './address-book.component.scss',
  ],
})
export class AddressBookComponent implements OnInit {
  isOpen: boolean = false;
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
        'location',
      ],
      office: [
        '',
      ],
      phone: this.fb.group({
        officePhone: [
          '',
          Validators.minLength(8),
        ],
        cellPhone: [
          '',
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
  constructor(private fb: FormBuilder) {}

  get name() {
    return this.addNewAddressForm.get('name');
  }

  get location() {
    return this.addNewAddressForm.get('location');
  }

  ngOnInit(): void {}

  addNewAddress() {
    this.isOpen = true;
  }

  setNameValueJason() {
    this.addNewAddressForm.controls['name'].setValue('Jason');
  }

  patchValue() {
    this.addNewAddressForm.patchValue({
      name: 'Jason Zhang',
      phone: {
        cellPhone: '1115566678',
      },
    });
  }

  get aliases() {
    return this.addNewAddressForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
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
  return name && location && location.value === name.value ? { identityRevealed: true } : null;
};
