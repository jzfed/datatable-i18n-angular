import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable/datatable.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from './loading/loading.component';
import { IconComponent } from './icon/icon.component';

import { DialogComponent } from './dialog/dialog.component';
import { DialogContentComponent } from './dialog/dialog-content.component';
import { DatatableRowComponent } from './datatable/datatable-row.component';
import { DatatableTdComponent } from './datatable/datatable-td.component';
import { DatatableRowDirective } from './datatable/datatable-row.directive';
import { DatatableTdDirective } from './datatable/datatable-td.directive';

@NgModule({
  declarations: [
    DatatableComponent,
    ButtonComponent,
    InputComponent,
    LoadingComponent,
    IconComponent,
    DialogComponent,
    DialogContentComponent,
    DatatableRowComponent,
    DatatableTdComponent,
    DatatableRowDirective,
    DatatableTdDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DatatableComponent,
    ButtonComponent,
    InputComponent,
    LoadingComponent,
    IconComponent,
    DialogComponent,
    DialogContentComponent,
    DatatableRowComponent,
    DatatableTdComponent,
    DatatableRowDirective,
    DatatableTdDirective,
  ],
})
export class ComponentsModule {}
