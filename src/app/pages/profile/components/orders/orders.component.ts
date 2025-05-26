import { Order, OrderResponse } from './../../../../core/interfaces/order';
import { Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AsideProfileNavbarComponent } from "../aside-profile-navbar/aside-profile-navbar.component";
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-orders',
  imports: [RouterLink , DatePipe, NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  showSidebar: boolean = false
  fontBold: boolean = false;
  Orders!: Order[];
  private _orderService =inject(OrderService)
  ngOnInit(): void {
    this._orderService.getUserOrders().subscribe({
      next: (data:OrderResponse) => {
        this.Orders = data.orders;
        console.log(this.Orders, "Orders");
      },
    })

  }

  orderSuttas(order:Order): string { 
    let message: string = '';
    if (order.orderStatus === 'orderd' && order.isDelivered === false) {
      message = 'قيد التنفيذ';
      this.fontBold = true;
    }
    else if (order.isDelivered ===  true && order.orderStatus === 'delivered') {
      message = 'تم التوصيل'
    }
    else if (order.isDelivered ===  true && order.orderStatus === 'delivered and installed') {
      message = 'تم التوصيل و التركيب'
    }
    else if (order.isRefunded ===  true ) {
      message = 'تم ارجاعه'
    }
    return message;
  }

  ngAfterViewInit() {
    const element = document.getElementById('profileTitle');
    if (element) {
      element.innerHTML = "طلباتي";
    }
  }

  openSidebar() {
    this.showSidebar = !this.showSidebar
  }
}
