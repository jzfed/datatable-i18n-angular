import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { AddressBookModule } from './address-book/address-book.module';
// import { AddressBookComponent } from './address-book/address-book.component';

const routes: Routes = [
  {
    path: 'page',
    children: [
      {
        path: 'address',
        loadChildren: () => import('./address-book/address-book.module').then((m) => m.AddressBookModule),
        // component: AddressBookComponent,
      },
      {
        path: '404',
        component: PageNotFoundComponent,
      },
      {
        path: '**',
        redirectTo: '/page/404',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    // AddressBookModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class PageRoutingModule {}
