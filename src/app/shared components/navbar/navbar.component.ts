import { CartService } from './../../core/services/cart.service';
import {
  Component,
  computed,
  Inject,
  inject,
  Input,
  NgZone,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { CartComponent } from '../cart/cart.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WishListComponent } from '../../pages/wish-list/wish-list.component';
import { WishListService } from '../../core/services/wish-list.service';
import { AuthService } from '../../core/services/auth.service';
import { AuthDialogComponent } from "../auth-dialog/auth-dialog.component";
import { AuthDialogService } from '../../core/services/auth-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe, RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Input() isLogin!: boolean;
  @ViewChild(CartComponent) cart!: CartComponent;
  private auth = inject(AuthService);
  hasToken = computed(this.auth.isLoggedIn);
  private CartService = inject(CartService);
  numOfCartItems = computed(() => this.CartService.counter());
  private wishList = inject(WishListService);
  numOfWhishlistItems = computed(() => this.wishList.counter());

  PLATFORM_ID = inject(PLATFORM_ID);
  currentLang: string = 'ar';

  isLoggedIn = computed(this.auth.isLoggedIn)
  constructor(
    private myTranslate: MyTranslateService,
    private authDialogService: AuthDialogService,
    private ngZone: NgZone
  ) {
    this.myTranslate.lang.subscribe((res) => {
      this.currentLang = res;
    });



  }

  // Fix the Router injection first (there was a typo)
  public router = inject(Router);

  // Dark mode signal
  public darkMode = signal<boolean>(false);

  openLogin() {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.router.navigate(['/profile/user-info']);

      } else {
        this.authDialogService.openLoginDialog();
      }
    }
  }

  openWishlist() {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.router.navigate(['/wishlist']);
      } else {
        this.authDialogService.openLoginDialog();
      }
    }
  }
  x = false
  ngOnInit(): void {
    this.updateComparisonItemsCount();
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      window.addEventListener('storage', (event) => {
        if (event.key === 'comparisonList') {
          this.updateComparisonItemsCount();
        }

      });

      // Also check for changes every 2 seconds (as a fallback)
      setInterval(() => this.updateComparisonItemsCount(), 2000);
    }

    if (isPlatformBrowser(this.PLATFORM_ID)) {
      if (localStorage.getItem('userToken')) {
        this.auth.isLogin.next(true)
      }
    }

    this.auth.isLogin.subscribe((res) => {
      this.x = res

      if (!res) {
        return;
      }

      if (res) {

        this.wishList.getWishList().subscribe({
          next: (res) => {


            this.wishList.counter.set(res.wishList.length);
          },
        });
      }
    })
    this.CartService.getHeaders()
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      const token = localStorage.getItem("userToken")
      if (!token && !localStorage.getItem('sessionId')) {
        this.CartService.getSessionId().subscribe({
          next: (res) => {

            this.CartService.getUserCart().subscribe({
              next: (res) => {

                this.CartService.counter.set(res.cart.cartItems.length);
              }, error: (err) => {
                this.CartService.counter.set(0);
                this.CartService.Items.set([])

              }
            });
          }
        })

      } 


    }
  }
  numOfComparisonItems = signal<number>(0)
  private updateComparisonItemsCount(): void {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      const count = this.getComparisonItemsCount();
      if (count !== this.numOfComparisonItems()) {
        this.numOfComparisonItems.set(count);
      }
    }
  }
  getComparisonItemsCount(): number {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      const comparisonList = localStorage.getItem('comparisonList');
      if (comparisonList) {
        return JSON.parse(comparisonList).length;
      }
    }
    return 0;
  }
  logout() {
    this.auth.logOut();
  }

  changeLang() {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      const lang = localStorage.getItem('lang') == 'en' ? 'ar' : ('en' as string);
      this.myTranslate.changeLang(lang);

    }
  }

  // Replace signal with a simple boolean
  mobileMenuOpen = false;

  // Use direct DOM manipulation to avoid Angular change detection
  toggleMobileMenuDOM() {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      const mobileMenu = document.getElementById('navbar-mobile');
      if (mobileMenu) {
        // Use CSS classes instead of directly modifying style
        if (mobileMenu.classList.contains('mobile-menu-visible')) {
          mobileMenu.classList.remove('mobile-menu-visible');
          mobileMenu.classList.add('mobile-menu-hidden');
        } else {
          mobileMenu.classList.add('mobile-menu-visible');
          mobileMenu.classList.remove('mobile-menu-hidden');
        }
      }
    }
  }
  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
      const html = document.documentElement;
      html.classList.toggle('dark');
  }
  comparisonList = signal<string[]>([])

  visible = signal(false)
  hasComparisonItems(): boolean | void {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      const comparisonList = localStorage.getItem('comparisonList');
      return comparisonList !== null && JSON.parse(comparisonList).length > 0;
    }
    return false
    }
}


