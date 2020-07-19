import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable/datatable.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from './loading/loading.component';
import { IconComponent } from './icon/icon.component';

import { DialogComponent } from './dialog/dialog.component';
import { DatatableToolbarComponent } from './datatable/datatable-toolbar.component';
import { DialogContentComponent } from './dialog/dialog-content.component';

@NgModule({
  declarations: [
    DatatableComponent,
    ButtonComponent,
    InputComponent,
    LoadingComponent,
    IconComponent,

    DatatableToolbarComponent,
    DialogComponent,
    DialogContentComponent,
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
    DatatableToolbarComponent,
    DialogComponent,
    DialogContentComponent,
  ],
})
export class ComponentsModule {}
