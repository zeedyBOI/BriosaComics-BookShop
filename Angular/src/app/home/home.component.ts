import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Book } from '../_models/book';
import { Cart } from '../_models/cart';
import { BookService } from '../_services/book/book.service';
import { CartService } from '../_services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  books: Book[] = [];

  @ViewChild('notiflix') notiflix!: ElementRef;

  constructor(
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => (this.books = books));
  }

  ngAfterViewInit(): void {
    const orderMade = localStorage.getItem('order-made');
    if (orderMade) this.notiflix.nativeElement.click();
    localStorage.removeItem('order-made');
  }

  addBookToCart(book: Book): void {
    this.cartService.currentCart.subscribe((cart: Cart) => {
      const item = cart.items.find((item) => item.book.isbn === book.isbn);

      if (item) item.quantity++;
      else cart.items.push({ book, quantity: 1 });

      cart.total = 0;
      cart.items.forEach((item) => {
        cart.total += item.book.price * item.quantity;
        cart.total = Number.parseFloat(cart.total.toPrecision(3));
      });
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  }
}
