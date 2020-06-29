import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { AddressBookComponent } from './page/address-book/address-book.component';

const routes: Routes = [
  { path: 'address', component: AddressBookComponent },
  { path: '', redirectTo: '/address', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
