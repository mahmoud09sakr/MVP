import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputErrorComponent } from "../../../../shared/components/input-error/input-error.component";
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AsideProfileNavbarComponent } from "../aside-profile-navbar/aside-profile-navbar.component";
import { CartService } from '../../../../core/services/cart.service';
@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormsModule, InputErrorComponent,
    // AsideProfileNavbarComponent
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {

  showPassword: boolean = false;
  showReEnteredPassword: boolean = false;
  userData: any;
  showSidebar:boolean = false;
  private PLATFORM_ID = inject(PLATFORM_ID);
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private router: Router = inject(Router);
  private CartService = inject(CartService);
  userInfoForm: FormGroup = new FormGroup({
    lastName: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern('01[0-2,5]{1}[0-9]{8,8}')]),
    password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}')]),
    rePassword: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {

    if (isPlatformBrowser(this.PLATFORM_ID)) {
      this.userData = JSON.parse(localStorage.getItem('userData') as string);
      this.userInfoForm.controls['name'].setValue(this.userData.name.split(' ')[0]);
      this.userInfoForm.controls['lastName'].setValue(this.userData.name.split(' ')[1]);
    }

    console.log(this.userData, "Dataaaaaaaa");
  }
  ngAfterViewInit() {
    const element = document.getElementById('profileTitle');
    if (element) { 
      element.innerHTML = "البيانات الشخصية";
    }
  }
  onSubmit() {
    if (this.userInfoForm.valid) { 
      this.userInfoForm.controls['name'].setValue(this.userInfoForm.controls['name'].value + ' ' + this.userInfoForm.controls['lastName'].value);

      this.userInfoForm.removeControl('lastName');
      this.userInfoForm.removeControl('password');
      this.userInfoForm.removeControl('rePassword');
      console.log(this.userInfoForm.value , "value after deleting lastName");

      
        this._authService.updateUserData(this.userInfoForm.value).subscribe({
          next: (response) => {
            console.log(response, "response");
          },
          error: (error) => {
            console.log(error, "error");
          }
        });
    } else {
      this.userInfoForm.markAllAsTouched();
      }
  }

  // get form controller as FormControl
  getFormController(controllerName: string) {
    return this.userInfoForm.get(controllerName) as FormControl;
  }

  openSidebar() {
    this.showSidebar = !this.showSidebar;
  }
  logout() {
    console.log('lodout');

    if (isPlatformBrowser(this.PLATFORM_ID)) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('sessionId');

      window.location.replace("/home")  


    }
    this.CartService.getSessionId().subscribe({
      next: (response) => {
        console.log(response, "response");
      },
      error: (error) => {
        console.log(error, "error");
      }
    })

    this.CartService.getUserCart().subscribe({
      next: (response) => {
        console.log(response, "response");
      },
      error: (error) => {
        console.log(error, "error");
      }
    })
    this.router.navigate(['/home'])
  }
}
