import { Component, OnInit } from '@angular/core';
import { CLASS_PREFIX } from '../../common/ts/constant';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: [
    './loading.component.scss'
  ]
})
export class LoadingComponent implements OnInit {
  prefix: string = `${CLASS_PREFIX}loading-bar`;
  constructor() {}

  ngOnInit(): void {}
}
