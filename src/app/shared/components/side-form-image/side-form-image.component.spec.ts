import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideFormImageComponent } from './side-form-image.component';

describe('SideFormImageComponent', () => {
  let component: SideFormImageComponent;
  let fixture: ComponentFixture<SideFormImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideFormImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideFormImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
