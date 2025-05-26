import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMyOrderComponent } from './track-my-order.component';

describe('TrackMyOrderComponent', () => {
  let component: TrackMyOrderComponent;
  let fixture: ComponentFixture<TrackMyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackMyOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackMyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
