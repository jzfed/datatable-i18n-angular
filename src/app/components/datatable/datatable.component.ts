import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { CLASS_PREFIX, dataIndex } from '../../common/ts/constant';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAddressSelector from '../../state/datatable.selector';
import * as AddressActions from '../../state/datatable.action';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: [
    './datatable.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DatatableComponent implements OnInit {
  @Input() fixColumnWidth;
  @Input() dataIndex;
  prefix: string = `${CLASS_PREFIX}table-wrapper`;
  $$datatable: Observable<any>;
  tableColIndex: string[][];
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    console.log('fixColumnWidth', this.fixColumnWidth);
    this.tableColIndex = Object.entries(dataIndex);
    console.log('tableColIndex', this.tableColIndex);
    this.$$datatable = this.store.pipe(select(fromAddressSelector.selectAddressBook));
    this.$$datatable.subscribe((data) => console.log('DatatableComponent get data:', data));
    this.store.dispatch(AddressActions.fetchAddressData());
  }

  fetchData() {}
}
