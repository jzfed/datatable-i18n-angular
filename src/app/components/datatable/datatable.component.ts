import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ElementRef,
  OnChanges,
  AfterViewChecked,
  AfterContentInit,
  AfterViewInit,
  AfterContentChecked,
  DoCheck,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { CLASS_PREFIX } from '../../common/ts/constant';
import { Observable } from 'rxjs';
import { UsersAddressData } from 'src/app/common/ts/interface';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    './datatable.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DatatableComponent implements OnInit, AfterViewChecked {
  @Input() fixColumnWidth: Array<string>;
  @Input() tableColIndex;
  @Input() data: Observable<UsersAddressData>;

  prefix: string = `${CLASS_PREFIX}table-wrapper`;
  constructor(private el: ElementRef, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.data.subscribe(
    //   // () => this.changeDetector.markForCheck(),
    //   // console.log(
    //   //   'height',
    //   //   (this.el.nativeElement.firstElementChild as HTMLDivElement).querySelector('table').offsetHeight
    //   // );
    //   // (data) => {
    //   //   console.log('changeDetector', data);
    //   // },
    //   null,
    //   null
    // );
  }

  ngAfterViewChecked() {
    console.log(
      'height',
      (this.el.nativeElement.firstElementChild as HTMLDivElement).querySelector('table').offsetHeight
    );
    console.dir(this.el.nativeElement.firstElementChild);
  }
}
