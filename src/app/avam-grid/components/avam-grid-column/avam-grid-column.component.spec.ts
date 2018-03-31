import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvamGridColumnComponent } from './avam-grid-column.component';

describe('AvamGridColumnComponent', () => {
  let component: AvamGridColumnComponent;
  let fixture: ComponentFixture<AvamGridColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvamGridColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvamGridColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
