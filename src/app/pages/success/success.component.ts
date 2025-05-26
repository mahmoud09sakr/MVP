import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-success',
  imports: [RouterLink,
    // TranslatePipe
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent {
  constructor(private cart: CartService) {
    this.cart.counter.set(0);
    this.cart.Items.set([]);
    this.cart.price.set(0);
    this.cart.noItems.set(0);
  }
}
