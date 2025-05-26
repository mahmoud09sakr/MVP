import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  withHashLocation,
} from '@angular/router';
import {
  CommonModule,
  isPlatformBrowser,
  TitleCasePipe,
} from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { platform } from 'os';
import { Output, EventEmitter } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CartService } from '../../../core/services/cart.service';
import { WishListService } from '../../../core/services/wish-list.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { InputErrorComponent } from '../../../shared/components/input-error/input-error.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    // TitleCasePipe,
    TranslatePipe,
    RouterLink,
    InputErrorComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() switchToRegister = new EventEmitter<void>();
  @Output() switchToResetPassword = new EventEmitter<void>();
  // Add this with other Output declarations
  @Output() closeDialog = new EventEmitter<void>();
  errMsg: string = '';
  isLoading: boolean = false;
  isLogin: any;
  isLoginPage: boolean = false;
  private CartService = inject(CartService);

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.url.subscribe((url) => {
      this.isLoginPage = url[0].path === 'login';
    });
  }

  LoginForm: FormGroup = new FormGroup({
    identifier: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  showPassword: boolean = false;
  cart = inject(CartService);
  wishlist = inject(WishListService);
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  PLATFORM_ID = inject(PLATFORM_ID);
  submit() {
    if (this.LoginForm.valid) {
      this.isLoading = true;

      this.auth.Login(this.LoginForm.value).subscribe({
        next: (res) => {
          if (isPlatformBrowser(this.PLATFORM_ID)) {
            localStorage.setItem('userToken', res.token);
            const decoded = jwtDecode(res.token);

            this.auth.isLoggedIn.set(true);
            this.auth.userData = decoded;
            localStorage.setItem('userData', JSON.stringify(decoded));
          }

          // this.auth.isLoggedIn.set(true);
          this.isLoading = false;
          this.auth.isLogin.next(true);
          // window.location.reload()
          // this.cart.getCart().subscribe()
          this.CartService.getUserCart().subscribe({
            next: (response) => {
              console.log(response, 'response');
              this.CartService.counter.set(response.cart.cartItems.length);
            },
            error: (error) => {
              console.log(error, 'error');
            },
          });

          let userData = {};
          if (isPlatformBrowser(this.PLATFORM_ID)) {
            userData = JSON.parse(localStorage.getItem('userData') as string);
          }

          console.log(userData, 'userDatauserDatauserDatauserData');

          this.wishlist.getWishList().subscribe({
            next: (res) => {
              this.wishlist.counter.set(res.wishList.length + 0);
            },
          });

          window.location.replace(`${window.location.origin}/#/home`);
          this.showSuccess('تم تسجيل الدخول بنجاح');
          if (this.isLoginPage) {
          } else {
            this.closeDialog.emit(); // Close the dialog instead of navigation
          }
        },
        error: (err) => {
          // display error
          this.errMsg = err.error.err;
          this.isLoading = false;
          this.showError('حدث خطأ في تسجيل الدخول ');
        },
      });
    }
  }

  showSuccess(msg: string) {
    this.toastr.success(msg, 'Premium Tires');
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Premium Tires');
  }
}
