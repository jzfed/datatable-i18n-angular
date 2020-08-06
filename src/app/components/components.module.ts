import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable/datatable.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from './loading/loading.component';
import { IconComponent } from './icon/icon.component';

import { DialogComponent } from './dialog/dialog.component';
import { DatatableRowComponent } from './datatable/datatable-row.component';
import { DatatableTdComponent } from './datatable/datatable-td.component';
import { DatatableRowDirective } from './datatable/datatable-row.directive';
import { DatatableTdDirective } from './datatable/datatable-td.directive';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    DatatableComponent,
    ButtonComponent,
    InputComponent,
    LoadingComponent,
    IconComponent,
    DialogComponent,
    DatatableRowComponent,
    DatatableTdComponent,
    DatatableRowDirective,
    DatatableTdDirective,
    ConfirmComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatatableComponent,
    ButtonComponent,
    InputComponent,
    LoadingComponent,
    IconComponent,
    DialogComponent,
    DatatableRowComponent,
    DatatableTdComponent,
    DatatableRowDirective,
    DatatableTdDirective,
    ConfirmComponent
  ]
})
export class ComponentsModule {}
