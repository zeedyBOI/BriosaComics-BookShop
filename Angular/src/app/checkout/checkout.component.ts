import { Component, OnInit } from '@angular/core';
import { Cart } from '../_models/cart';
import { CartItem } from '../_models/cart-item';
import { CartService } from '../_services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: Cart = { items: [], total: 0 };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.currentCart.subscribe((cart) => (this.cart = cart));
  }

  removeItemFromCart(item: CartItem): void {
    this.cart.items = this.cart.items.filter(
      (it) => it.book.isbn !== item.book.isbn
    );
    this.calculateTotal();
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  incrementItemQuantity(item: CartItem): void {
    item.quantity++;
    this.calculateTotal();
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  decrementItemQuantity(item: CartItem): void {
    if (item.quantity === 0) return;

    item.quantity--;
    if (item.quantity === 0) {
      this.cart.items = this.cart.items.filter(
        (it) => it.book.isbn !== item.book.isbn
      );
    }

    this.calculateTotal();
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private calculateTotal(): void {
    this.cart.total = 0;
    this.cart.items.forEach((item) => {
      this.cart.total += item.book.price * item.quantity;
      this.cart.total = Number.parseFloat(this.cart.total.toPrecision(3));
    });
  }
}
