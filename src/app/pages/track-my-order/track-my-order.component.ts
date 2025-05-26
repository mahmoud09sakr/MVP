
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { log } from 'console';

@Component({
  selector: 'app-track-my-order',
  imports: [NgClass, ReactiveFormsModule, TranslatePipe],
  templateUrl: './track-my-order.component.html',
  styleUrl: './track-my-order.component.css'
})
export class TrackMyOrderComponent {
  trackOrderForm: FormGroup = new FormGroup({
    orderId: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{1,10}$')]),
  });

  submit() {
    console.log(this.trackOrderForm);
    
  }

}
