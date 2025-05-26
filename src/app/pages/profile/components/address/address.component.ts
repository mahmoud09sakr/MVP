import { Component, ElementRef, Renderer2, signal, ViewChild } from '@angular/core';
import { InputErrorComponent } from "../../../../shared/components/input-error/input-error.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AsideProfileNavbarComponent } from "../aside-profile-navbar/aside-profile-navbar.component";

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule, NgClass, FormsModule, InputErrorComponent,
    //AsideProfileNavbarComponent
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  showSidebar: boolean = false;
  
  editAddressForm: FormGroup = new FormGroup({
    city: new FormControl(null, [Validators.required]),
    area: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    homeNumber: new FormControl(null, [Validators.required]),
  });

  newAddressForm: FormGroup = new FormGroup({
    city: new FormControl(null, [Validators.required]),
    area: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    homeNumber: new FormControl(null, [Validators.required]),
  });


  // move the h1 to the main page
  ngAfterViewInit() {
    const element = document.getElementById('profileTitle');
    if (element) {
      element.innerHTML = "العنوان";
    }
  }
  onSubmit() { 
    console.log(this.editAddressForm);
    this.editAddressForm.markAllAsTouched();
  }
  onSubmitAddNewAddress() {
    console.log(this.newAddressForm);
    this.newAddressForm.markAllAsTouched();
  }
  openSidebar() {
    this.showSidebar = !this.showSidebar
  }
}
