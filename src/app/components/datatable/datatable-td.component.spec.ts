import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableTdComponent } from './datatable-td.component';

describe('DatatableTdComponent', () => {
  let component: DatatableTdComponent;
  let fixture: ComponentFixture<DatatableTdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableTdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
