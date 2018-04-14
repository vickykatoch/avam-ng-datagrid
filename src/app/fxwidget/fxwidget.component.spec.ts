import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxwidgetComponent } from './fxwidget.component';

describe('FxwidgetComponent', () => {
  let component: FxwidgetComponent;
  let fixture: ComponentFixture<FxwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
