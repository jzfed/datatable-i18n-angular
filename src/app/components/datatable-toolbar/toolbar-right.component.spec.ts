import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarRightComponent } from './toolbar-right.component';

describe('ToolbarRightComponent', () => {
  let component: ToolbarRightComponent;
  let fixture: ComponentFixture<ToolbarRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
