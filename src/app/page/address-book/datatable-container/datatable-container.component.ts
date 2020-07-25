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
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  ContentChild,
  ComponentFactoryResolver,
} from '@angular/core';
import { CLASS_PREFIX } from '../../../common/ts/constant';

import * as fromAddressSelector from '../state/datatable.selector';
import * as fromAddressActions from '../state/datatable.action';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { List } from 'immutable';
import { DatatableComponent } from 'src/app/components/datatable/datatable.component';

@Component({
  selector: 'app-datatable-container',
  templateUrl: './datatable-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    './datatable-container.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DatatableContainerComponent
  implements OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, OnChanges {
  isLoading: Observable<boolean>;
  prefix: string = `${CLASS_PREFIX}table-wrapper`;
  // @ViewChild('displayToolbar') displayToolbar: ViewContainerRef;
  // @ContentChild(DatatableToolbarComponent) toolbarContent: DatatableToolbarComponent;
  @ContentChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private el: ElementRef,
    private vcr: ViewContainerRef,
    private readonly store: Store,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.isLoading = this.store.pipe(select(fromAddressSelector.selectLoadingStatus));
    // this.isLoading.subscribe((data) => console.log('DatatableComponent get isLoading:', data));

    // this.$$datatable.subscribe((data) => console.log('DatatableComponent get data:', data));
  }

  ngAfterContentInit() {}

  ngAfterViewInit() {
    console.log('DatatableContainerComponent table child', this.table);
    console.log('DatatableContainerComponent view ref', this.vcr);
  }

  ngOnChanges() {}

  ngAfterViewChecked() {
    // console.log(
    //   'DatatableContainerComponent height',
    //   getComputedStyle((this.el.nativeElement.firstElementChild as HTMLDivElement).querySelector('table')).height
    // );
  }
}
