import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SweepStakesLadderComponent } from './sweep-stakes-ladder.component';

describe('SweepStakesLadderComponent', () => {
  let component: SweepStakesLadderComponent;
  let fixture: ComponentFixture<SweepStakesLadderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SweepStakesLadderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SweepStakesLadderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
