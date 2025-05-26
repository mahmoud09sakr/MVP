import { MyTranslateService } from './../../../core/services/my-translate.service';
import { Component, EventEmitter, inject, Output, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { InputOtpModule } from 'primeng/inputotp';
import { InputErrorComponent } from "../../../shared/components/input-error/input-error.component";
import { SideFormImageComponent } from "../../../shared/components/side-form-image/side-form-image.component";
import { log } from 'console';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-reset-password',
  imports: [InputOtpModule, ReactiveFormsModule, TranslatePipe, CommonModule, InputErrorComponent, 
    // SideFormImageComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  @Output() closeDialog = new EventEmitter<void>();

  steps: number = 1;
  errMsg: string = '';
  isResetPage: boolean = false; 
  PLATFORM_ID = inject(PLATFORM_ID);
  SendOtpForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  validateOtpForm: FormGroup = new FormGroup({
    email: new FormControl(null ,[Validators.required, Validators.email]),
    otp: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    otp: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),

    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _myTranslateService: MyTranslateService
  ) {
    route.url.subscribe((url) => {
      this.isResetPage = url[0].path === 'forget-password';
     });
  }
  SendOtp() {
    if(this.SendOtpForm.valid){

    this.auth.sendOTP(this.SendOtpForm.value).subscribe({
      next: (res) => {
        this.toastr.success('تم ارسال الكود الي بريدك الاكتروني');
        this.steps = 2;
        this.validateOtpForm.controls['email'].setValue(this.SendOtpForm.controls['email'].value);
      },
      error: (err) => {
        this.toastr.error(err.error.error.ar);
        // this.toastr.error(err.err)
      },
    });
    }
    else{
      this.toastr.error('الرجاء ادخال البريد الالكتروني');
      this.SendOtpForm.markAllAsTouched();
    }
    // step2
  }
  validateOtp() {
    console.log(this.validateOtpForm.value);
    console.log(this.SendOtpForm.controls['email'].value);
    
    
    if(this.validateOtpForm.valid){

    this.auth.ResetPassword(this.validateOtpForm.value).subscribe({
      next: (res) => {
       this.showSuccess(res.message)
        this.steps = 3;
        this.resetPasswordForm.controls['email'].setValue(this.SendOtpForm.controls['email'].value);
        this.resetPasswordForm.controls['otp'].setValue(this.validateOtpForm.controls['otp'].value);

      },
      error: (err) => {
        this.showError(err.error.error);
        // this.toastr.error(err.err)
      },
    });
    }
    else{
      this.toastr.error('الكود المكون من 4 ارقام');
      this.validateOtpForm.markAllAsTouched();
    }
    // step2
  }
  ResetPassword() {
    let formData = {
      ...this.resetPasswordForm.value,
      otp: Number(this.resetPasswordForm.value.otp),
    };
    if(this.resetPasswordForm.valid){
      
    this.auth.ResetPassword(formData).subscribe({
      next: (res) => {
        this.showSuccess(res.message)


        if (isPlatformBrowser(this.PLATFORM_ID)) {
          localStorage.setItem('userToken', res.token);
          const decoded = jwtDecode(res.token);
          this.auth.isLoggedIn.set(true)
          this.auth.userData = decoded
          localStorage.setItem('userData', JSON.stringify(decoded));
        }
        if (this.isResetPage) { 
          this.router.navigate(['/login']);
        } else {
          this.closeDialog.emit(); 
        }
      },
      error: (err) => {
        this.showError(err.error.error);
      },
    });
  }else{
    console.log(this.resetPasswordForm.valid);
    console.log(this.resetPasswordForm.value);
    
    this.toastr.error('الرجاء ادخال جميع الحقول');
    this.resetPasswordForm.markAllAsTouched();
  }
}
  showPassword: boolean = false;
  rePassword: boolean = false;

  togglePasswordVisibility(field: 'password' | 'confirm') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.rePassword = !this.rePassword;
    }
  }



  showSuccess(msg: any) {
    this.toastr.success(this._myTranslateService.translateApi(msg));
  }

  showError(msg: any) {
    this.toastr.error(this._myTranslateService.translateApi(msg));
  }
}
