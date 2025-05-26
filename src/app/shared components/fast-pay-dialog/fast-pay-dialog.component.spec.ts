import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastPayDialogComponent } from './fast-pay-dialog.component';

describe('FastPayDialogComponent', () => {
  let component: FastPayDialogComponent;
  let fixture: ComponentFixture<FastPayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastPayDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastPayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
