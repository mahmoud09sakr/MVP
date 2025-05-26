import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-aside-profile-navbar',
  imports: [RouterLink, RouterLinkActive , TranslatePipe],
  templateUrl: './aside-profile-navbar.component.html',
  styleUrl: './aside-profile-navbar.component.css'
})
export class AsideProfileNavbarComponent {
  @Output() showSidebar: EventEmitter<boolean> = new EventEmitter<boolean>(false);
 
  unShowSideNavBar() { 
    this.showSidebar.emit(false);
  }
  links: { name: string; path: string }[] = [
    { name: 'profile.nav.personal_info', path: '/profile/user-info' },
    { name: 'profile.nav.addresses', path: '/profile/addresses' },
    { name: 'profile.nav.orders', path: '/profile/orders' },
    { name: 'profile.nav.order_price', path: '/profile/order-price' },
    { name: 'profile.nav.way_to_pay', path: '/profile/ways-to-pay' },
    { name: 'profile.nav.complaints', path: '/profile/complaints' },
    { name: 'profile.nav.returns', path: '/profile/returns' },
    { name: 'profile.nav.wait_list', path: '/profile/wait-list' }
  ];

}
