import {
  Component,
  OnInit,
  ElementRef,
  ViewEncapsulation,
  OnChanges,
  AfterViewChecked,
  AfterContentInit,
  AfterViewInit,
  AfterContentChecked,
  DoCheck,
  ChangeDetectionStrategy
} from '@angular/core';
import { CLASS_PREFIX } from '../../common/ts/constant';
import { AddressService } from 'src/app/service/address.service';
import * as fromAddressSelector from '../../state/datatable.selector';
import * as AddressActions from '../../state/datatable.action';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersAddressData } from 'src/app/state/datatable.model';
import { List } from 'immutable';

@Component({
  selector: 'app-datatable-container',
  templateUrl: './datatable-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    './datatable-container.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DatatableContainerComponent implements OnInit {
  isInput: boolean;
  tableColIndex: string[][];
  data: Observable<Array<UsersAddressData>>;
  isLoading: Observable<boolean>;
  prefix: string = `${CLASS_PREFIX}table-wrapper`;

  constructor(private el: ElementRef, private addressService: AddressService, private readonly store: Store) {}

  ngOnInit(): void {
    this.tableColIndex = this.addressService.tableColIndex;
    this.isLoading = this.store.pipe(select(fromAddressSelector.selectLoadingStatus));
    // this.isLoading.subscribe((data) => console.log('DatatableComponent get isLoading:', data));
    this.data = this.store.pipe(select(fromAddressSelector.selectAddressBook));
    // this.$$datatable.subscribe((data) => console.log('DatatableComponent get data:', data));
    this.store.dispatch(AddressActions.fetchAddressData());
  }

  // ngAfterViewChecked() {
  //   console.log(
  //     'height',
  //     getComputedStyle((this.el.nativeElement.firstElementChild as HTMLDivElement).querySelector('table')).height
  //   );
  //   console.dir(this.el.nativeElement.firstElementChild);
  // }
}
