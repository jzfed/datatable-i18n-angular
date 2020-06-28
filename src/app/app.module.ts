import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { LoadingComponent } from './components/loading/loading.component';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent,
    ButtonComponent,
    InputComponent,
    LoadingComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
