import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HgridDemoComponent } from './hgrid-demo.component';

describe('HgridDemoComponent', () => {
  let component: HgridDemoComponent;
  let fixture: ComponentFixture<HgridDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HgridDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
