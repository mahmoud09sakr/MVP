import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastrService } from 'ngx-toastr';
import { InputErrorComponent } from "../../../shared/components/input-error/input-error.component";

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    // TitleCasePipe,
    // RouterLink,
    TranslatePipe,
    CheckboxModule,
    InputErrorComponent,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  [x: string]: any;
  errMsg: string = '';
  isLoading: boolean = false;
  isRegisterPage: boolean = false;
  @Output() switchToLogin = new EventEmitter<void>();
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),

    confirmPassword: new FormControl(null),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/),
    ]),
    confirmRule: new FormControl(null, Validators.required),
  },
    this.confirmPassword
  );

  constructor(private auth: AuthService, private toastr: ToastrService, private route: ActivatedRoute,private router: Router ) {
    this.route.url.subscribe((url) => {
      this.isRegisterPage = url[0].path === 'register';
    });
  }


  submit() {

    this.isLoading = true;
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.auth.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          // navigate to login
          
          this.isLoading = false;
          this.showSuccess('تم تسجيل المستخدم بنجاح,برجاء التحقق من البريد الالكتروني')
          if (this.isRegisterPage) {
            this.router.navigate(['/login']);

          } else {
            this.switchToLogin.emit()

          }

        },
        error: (err) => {
          // display error
          this.errMsg = err.error.error.ar;
          this.isLoading = false;

          this.showError(err.error.error.ar ? err.error.error.ar : "حدث خطأ في تسجيل المستخدم حاول مره اخري")
        },
      });
    }
    else {
      this.isLoading = false;
      this.showError('برجاء التحقق من البيانات المدخله');
      this.registerForm.markAllAsTouched()
      console.log(this.registerForm);
    }

  }

  confirmPassword(group: AbstractControl) {
    let password = group.get('password')?.value;
    let repassword = group.get('confirmPassword')?.value;
    if (password == repassword) {
      return null;
    } else {
      return { misMatch: true };
    }
  }

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  togglePasswordVisibility(field: 'password' | 'confirm') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }




  showSuccess(msg: string) {
    this.toastr.success(msg, 'Premium Tires');
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Premium Tires');
  }
}