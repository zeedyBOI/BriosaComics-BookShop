import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/_models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSource = new BehaviorSubject<Cart>(
    JSON.parse(localStorage.getItem('cart') as string) ||
      ({ items: [], total: 0 } as Cart)
  );
  currentCart = this.cartSource.asObservable();

  constructor() {}

  setCart(cart: Cart): void {
    this.cartSource.next(cart);
  }
}
