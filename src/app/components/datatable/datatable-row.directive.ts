import { Directive, Input } from '@angular/core';
import { DatatableService } from './datatable.service';

@Directive({
  selector: '[appDatatableRow]',
  host: {
    '[class.selected]': 'datatableService.selectedRowItems.has(this.rowIndex)',
  },
})
export class DatatableRowDirective {
  @Input() rowIndex;
  constructor(private datatableService: DatatableService) {
    // console.log('DatatableRowDirective -> Select this row', this.datatableService.selectedRowItems.has(this.rowIndex));
  }
}
