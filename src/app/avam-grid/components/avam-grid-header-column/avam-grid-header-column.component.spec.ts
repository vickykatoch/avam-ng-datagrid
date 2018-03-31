import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvamGridHeaderColumnComponent } from './avam-grid-header-column.component';

describe('AvamGridHeaderColumnComponent', () => {
  let component: AvamGridHeaderColumnComponent;
  let fixture: ComponentFixture<AvamGridHeaderColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvamGridHeaderColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvamGridHeaderColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
