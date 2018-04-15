import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxWidgetHostComponent } from './fx-widget-host.component';

describe('FxWidgetHostComponent', () => {
  let component: FxWidgetHostComponent;
  let fixture: ComponentFixture<FxWidgetHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxWidgetHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxWidgetHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
