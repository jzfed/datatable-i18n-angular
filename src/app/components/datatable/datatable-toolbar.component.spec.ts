import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableToolbarComponent } from './datatable-toolbar.component';

describe('DatatableToolbarComponent', () => {
  let component: DatatableToolbarComponent;
  let fixture: ComponentFixture<DatatableToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
