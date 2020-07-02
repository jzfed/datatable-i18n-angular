import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { LoadingComponent } from './components/loading/loading.component';
import { IconComponent } from './components/icon/icon.component';

import * as fromAddressBook from './state/datatable.reducer';
import { AddressBookEffects } from './state/datatable.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AddressBookComponent } from './page/address-book/address-book.component';
import { DatatableContainerComponent } from './components/datatable-container/datatable-container.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DatatableToolbarComponent } from './components/datatable-toolbar/datatable-toolbar.component';
import { ToolbarRightComponent } from './components/datatable-toolbar/toolbar-right.component';
import { ToolbarLeftComponent } from './components/datatable-toolbar/toolbar-left.component';

@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent,
    ButtonComponent,
    InputComponent,
    LoadingComponent,
    IconComponent,
    AddressBookComponent,
    DatatableContainerComponent,
    PageNotFoundComponent,
    DialogComponent,
    DatatableToolbarComponent,
    ToolbarRightComponent,
    ToolbarLeftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      $$datatable: fromAddressBook.reducer
    }),
    EffectsModule.forRoot([
      AddressBookEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
