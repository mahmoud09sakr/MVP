import { Component, inject, signal } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import { MessageComponent } from "./component/message/message.component";

import { NgClass } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
// import { MessageComponent } from './conponent/message/message.component';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MessageComponent,
    NgClass
],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  // Define the properties for the message component 
  messageError: boolean = false;
  ShowMessage: boolean = false;
  contactForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern('01(2|0|5)[0-9]{8,8}')]),
    message: new FormControl(null, [Validators.required]),
  }); 
  
  private _contactService: ContactService = inject(ContactService)
  

  submit() {
    console.log(this.contactForm.valid);
    
    if (this.contactForm.valid) {
      // Call the service to send the message
      this._contactService.sendMessage(this.contactForm.value).subscribe({
        next: (res) => { 
          console.log(res);
          this.contactForm.reset();

          // handle the response for the message component
          this.messageError = false
          this.ShowMessage = true
        },
        error: (err) => {
          console.log(err);
          // handle the response for the message component
          this.messageError = true
          this.ShowMessage = true
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }

  }
}
