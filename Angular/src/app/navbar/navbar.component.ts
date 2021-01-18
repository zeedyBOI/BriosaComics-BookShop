import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from '../_models/cart';
import { CartItem } from '../_models/cart-item';
import { User } from '../_models/user';
import { CartService } from '../_services/cart/cart.service';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private cartSubscription!: Subscription;

  user!: User;
  cart: Cart = { items: [], total: 0 } as Cart;
  bookTitle = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => (this.user = user));

    this.cartSubscription = this.cartService.currentCart.subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    localStorage.clear();
    this.cartSubscription.unsubscribe();
  }

  userLoggedIn(): boolean {
    return Object.keys(this.user).length > 0;
  }

  logout(): void {
    this.userService.setCurrentUser({} as User);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  checkout(): void {
  if (!this.userLoggedIn())
      this.router.navigate(['/login'], {
        queryParams: { redirecTo: 'checkout' },
      });
    else this.router.navigate(['/checkout']);
  }

  searchBook(): void {
    if (this.bookTitle.trim().length > 0)
      this.router.navigate(['/search'], {
        queryParams: { title: this.bookTitle },
      });
  }

  onKeyPress(event: any): void {
    if (event.keyCode === 13) this.searchBook();
  }
}
