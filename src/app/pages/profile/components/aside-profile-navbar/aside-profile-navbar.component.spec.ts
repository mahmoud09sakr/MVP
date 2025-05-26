import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideProfileNavbarComponent } from './aside-profile-navbar.component';

describe('AsideProfileNavbarComponent', () => {
  let component: AsideProfileNavbarComponent;
  let fixture: ComponentFixture<AsideProfileNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideProfileNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideProfileNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
