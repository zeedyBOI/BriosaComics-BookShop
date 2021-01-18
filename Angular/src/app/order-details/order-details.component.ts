import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { V4Options as UUID } from 'uuid';
import { Cart } from '../_models/cart';
import { CartItem } from '../_models/cart-item';
import { BookOrder, Order } from '../_models/order';
import { User } from '../_models/user';
import { CartService } from '../_services/cart/cart.service';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  user!: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as string);
  }

  makeOrder(): void {
    const cart: Cart = JSON.parse(localStorage.getItem('cart') as string);

    const orders: BookOrder[] = [];
    cart.items.forEach((item: CartItem) =>
      orders.push({ bookOrder: item.book, stockBought: item.quantity })
    );

    const order: Order = {
      clientId: this.user.id as UUID,
      orders,
    };
    this.userService.makeOrder(order).subscribe((next) => {
      localStorage.setItem('order-made', 'true');
      localStorage.removeItem('cart');
      this.cartService.setCart({ items: [], total: 0 });
      this.router.navigate(['/']);
    });
  }
}
