import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressBookComponent } from './address-book.component';
import * as fromAddressBook from './state/datatable.reducer';
import { AddressBookEffects } from './state/datatable.effects';
import { DatatableContainerComponent } from './datatable-container/datatable-container.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { AddAddressFormComponent } from './add-address-form/add-address-form.component';
import { AddressService } from './address-book.service';

const routes: Routes = [
  {
    path: '',
    component: AddressBookComponent,
  },
];

@NgModule({
  declarations: [
    AddressBookComponent,
    DatatableContainerComponent,
    AddAddressFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('$$datatable', fromAddressBook.reducer),
    EffectsModule.forFeature([
      AddressBookEffects,
    ]),
  ],
  providers: [
    AddressService,
  ],
  exports: [
    AddressBookComponent,
  ],
})
export class AddressBookModule {}
