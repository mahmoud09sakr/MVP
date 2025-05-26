import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaysToPayComponent } from './ways-to-pay.component';

describe('WaysToPayComponent', () => {
  let component: WaysToPayComponent;
  let fixture: ComponentFixture<WaysToPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaysToPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaysToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
