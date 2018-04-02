import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvamVirtualGridComponent } from './avam-virtual-grid.component';

describe('AvamVirtualGridComponent', () => {
  let component: AvamVirtualGridComponent;
  let fixture: ComponentFixture<AvamVirtualGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvamVirtualGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvamVirtualGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
