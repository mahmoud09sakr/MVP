import { ProfileComponent } from './pages/profile/profile.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SuccessComponent } from './pages/success/success.component';
import { FailedComponent } from './pages/failed/failed.component';
import { RegisterComponent } from './pages/Auth/register/register.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { ResetPasswordComponent } from './pages/Auth/reset-password/reset-password.component';
import { AuthComponent } from './core/layouts/auth/auth.component';
import { BlankComponent } from './core/layouts/blank/blank.component';
import { loggedGuard } from './core/guards/logged.guard';
import { authGuard } from './core/guards/auth.guard';
import { BrandsComponent } from './pages/brands/brands.component';
import { AboutComponent } from './pages/about/about.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CompareComponent } from './pages/compare/compare.component';
import { OffersComponent } from './pages/offers/offers.component';
import { CartComponent } from './shared components/cart/cart.component';
import { PaymentDetailsComponent } from './pages/payment-details/payment-details.component';
import { BlogsDetailsComponent } from './pages/blogs-details/blogs-details.component';
import { RefundPolicyComponent } from './pages/refund-policy/refund-policy.component';
import { WarrantyPolicyComponent } from './pages/warranty-policy/warranty-policy.component';
import { ShippingPolicyComponent } from './pages/shipping-policy/shipping-policy.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { FrequentlyAskedQuestionsComponent } from './pages/frequently-asked-questions/frequently-asked-questions.component';
import { SecurePaymentComponent } from './pages/secure-payment/secure-payment.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },


  {
    path: '',
    component: BlankComponent,
    title: 'blank',
    children: [
      { path: 'home', component: HomeComponent, title: 'home' },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/wish-list/wish-list.component').then(
            (c) => c.WishListComponent,
          ),
        canActivate: [authGuard],
        title: 'Wish List'
      },
      {
        path: 'checkout/:id/:term',
        data: { isCSR: true },
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (c) => c.CheckoutComponent,
          ),
        title: 'checkout',
      },
      {
        path: 'payment/success',
        loadComponent: () =>
          import('./pages/success/success.component').then(
            (c) => c.SuccessComponent,
          ),
        title: 'success payment',
      },
      {
        path: "blog-details/:id",
        component: BlogsDetailsComponent,
        title: "Blog-Details"
      },
      /////
      {
        path: "refund-policy",
        component: RefundPolicyComponent,
        title: "refund-policy"
      },
      {
        path: "warranty-policy",
        component: WarrantyPolicyComponent,
        title: "warranty-policy"
      },
      {
        path: "terms-conditions",
        component: TermsConditionsComponent,
        title: "terms-conditions"
      },
      {
        path: "shipping-policy",
        component: ShippingPolicyComponent,
        title: "shipping-policy"
      },
      {
        path: "privacy-policy",
        component: PrivacyPolicyComponent,
        title: "privacy-policy"
      },
      {
        path: "frequently-asked-questions",
        component: FrequentlyAskedQuestionsComponent,
        title: "frequently-asked-questions"
      },

      {
        path: "secure-payment",
        component: SecurePaymentComponent,
        title: "secure-payment"
      },
      {
        path: 'payment/faild',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/failed/failed.component').then(
            (c) => c.FailedComponent,
          ),
        title: 'failed payment',
      },
      {
        path: 'details/:id',
        data: { isCSR: true },
        loadComponent: () =>
          import('./pages/product-details/product-details.component').then(
            (c) => c.ProductDetailsComponent,
          ),
        title: 'details',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (c) => c.BrandsComponent,
          ),
        title: 'brands'
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then(
            (c) => c.AboutComponent,
          ),
        title: 'About Us'
      },
      {
        path: 'shop',
        loadComponent: () =>
          import('./pages/shop/shop.component').then(
            (c) => c.ShopComponent,
          ),
        title: 'Shop'
      },
      {
        path: 'compare',
        loadComponent: () =>
          import('./pages/compare/compare.component').then(
            (c) => c.CompareComponent,
          ),
        title: 'compare'
      },
      {
        path: 'offers',
        loadComponent: () =>
          import('./pages/offers/offers.component').then(
            (c) => c.OffersComponent,
          ),
        title: 'offers'
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./shared components/cart/cart.component').then(
            (c) => c.CartComponent,
          ),
        title: 'cart'
      },
      // profile routes
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (c) => c.ProfileComponent,
          ),
        children: [
          {
            path: '',
            redirectTo: 'user-info',
            pathMatch: 'full',
          },
          {
            path: 'user-info',
            loadComponent: () =>
              import('./pages/profile/components/user-info/user-info.component').then(
                (c) => c.UserInfoComponent,
              ),
            title: 'profile',
          },
          {
            path: 'addresses',
            loadComponent: () =>
              import('./pages/profile/components/address/address.component').then(
                (c) => c.AddressComponent,
              ),
            title: 'user addresses',
          },
          {
            path: 'orders',
            loadComponent: () =>
              import('./pages/profile/components/orders/orders.component').then(
                (c) => c.OrdersComponent,
              ),
            title: 'orders',
          },
          {
            path: 'orders/details',
            loadComponent: () =>
              import('./pages/profile/components/orders/orders.component').then(
                (c) => c.OrdersComponent,
              ),
            title: 'orders details',
          },
          {
            path: 'order-price',
            loadComponent: () =>
              import('./pages/profile/components/order-price/order-price.component').then(
                (c) => c.OrderPriceComponent,
              ),
            title: 'order price',
          },
          {
            path: 'ways-to-pay',
            loadComponent: () =>
              import('./pages/profile/components/ways-to-pay/ways-to-pay.component').then(
                (c) => c.WaysToPayComponent,
              ),
            title: 'ways to pay',
          },
          {
            path: 'complaints',
            loadComponent: () =>
              import('./pages/profile/components/complaints/complaints.component').then(
                (c) => c.ComplaintsComponent,
              ),
            title: 'complaints',
          },
          {
            path: 'returns',
            loadComponent: () =>
              import('./pages/profile/components/returns/returns.component').then(
                (c) => c.ReturnsComponent,
              ),
            title: 'returns',
          },
          {
            path: 'wait-list',
            loadComponent: () =>
              import('./pages/profile/components/wait-list/wait-list.component').then(
                (c) => c.WaitListComponent,
              ),
            title: 'wish list',
          },
          {
            path: '**',
            redirectTo: 'user-info',
            pathMatch: 'full',
          }
        ]
      },
      {
        path: 'paymentDetails',
        loadComponent: () =>
          import('./pages/payment-details/payment-details.component').then(
            (c) => c.PaymentDetailsComponent,
          ),
        title: 'payment'
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.component').then(
            (c) => c.ContactComponent,
          ),
        title: 'contact Us'
      },
      {
        path: 'tracking',

        loadComponent: () =>
          import('./pages/track-my-order/track-my-order.component').then(
            (c) => c.TrackMyOrderComponent,
          ),
        title: 'track my order',
      },

      {
        path: "blog-details/:id",
        component: BlogsDetailsComponent,
        title: "Blog-Details"
      },
      /////
      {
        path: "refund-policy",
        component: RefundPolicyComponent,
        title: "refund-policy"
      },
      {
        path: "warranty-policy",
        component: WarrantyPolicyComponent,
        title: "warranty-policy"
      },
      {
        path: "terms-conditions",
        component: TermsConditionsComponent,
        title: "terms-conditions"
      },
      {
        path: "shipping-policy",
        component: ShippingPolicyComponent,
        title: "shipping-policy"
      },
      {
        path: "privacy-policy",
        component: PrivacyPolicyComponent,
        title: "privacy-policy"
      },
      {
        path: "frequently-asked-questions",
        component: FrequentlyAskedQuestionsComponent,
        title: "frequently-asked-questions"
      },

      {
        path: "secure-payment",
        component: SecurePaymentComponent,
        title: "secure-payment"
      },
      
    ],
  },
  {
    path: '',
    component: AuthComponent,
    title: 'auth',
    canActivate: [loggedGuard],
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/Auth/register/register.component').then(
            (c) => c.RegisterComponent,
          ),
        title: 'sign up',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/Auth/login/login.component').then(
            (c) => c.LoginComponent,
          ),
        title: 'login',
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./pages/Auth/reset-password/reset-password.component').then(
            (c) => c.ResetPasswordComponent,
          ),
        title: 'forget password',
      },
    ],
  },
];







