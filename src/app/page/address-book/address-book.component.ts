import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './address-book.component.html',
  styleUrls: [
    './address-book.component.scss'
  ]
})
export class AddressBookComponent implements OnInit {
  isOpen: boolean;
  constructor() {}

  ngOnInit(): void {
    this.isOpen = true;
  }
}
