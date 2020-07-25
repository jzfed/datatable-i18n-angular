import {
  Component,
  OnInit,
  ViewRef,
  ViewContainerRef,
  Input,
  EmbeddedViewRef,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { DatatableService, DatatableRowService } from './datatable.service';

@Component({
  selector: 'app-datatable-td',
  template: `
        <ng-content></ng-content>
  `,
  host: {
    '[class.datatable-td]': 'true',
    '[style.width]': 'width',
  },
})
export class DatatableTdComponent implements OnInit, AfterViewInit, OnDestroy {
  tdView: EmbeddedViewRef<void>;
  tdIndex: number;
  width: string;
  // @ViewChild('tdTemplate') tdTemplate: TemplateRef<void>;
  constructor(
    public vcr: ViewContainerRef,
    private datatableRowService: DatatableRowService,
    private datatableService: DatatableService
  ) {}

  ngOnInit(): void {
    this.tdIndex = this.datatableRowService.tdCount++;
    this.width = this.datatableService.fixColumnWidth[this.tdIndex];
  }

  ngAfterViewInit() {
    // this.tdView = this.tdTemplate.createEmbeddedView(null);
  }

  ngOnDestroy() {
    // this.tdView.destroy();
  }
}
