import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CLASS_PREFIX } from '../../common/js/constant';
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: [
    './datatable.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DatatableComponent implements OnInit {
  prefix: string = `${CLASS_PREFIX}table-wrapper`;
  constructor() {}

  ngOnInit(): void {}
}
