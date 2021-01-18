import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../_models/book';
import { Cart } from '../_models/cart';
import { BookService } from '../_services/book/book.service';
import { CartService } from '../_services/cart/cart.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss'],
})
export class BookInfoComponent implements OnInit {
  book: Book = {} as Book;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const isbn = Number.parseInt(
      this.activatedRoute.snapshot.paramMap.get('isbn') as string,
      10
    );
    this.bookService.getBook(isbn).subscribe((book) => (this.book = book));
  }

  addBookToCart(): void {
    this.cartService.currentCart.subscribe((cart: Cart) => {
      const item = cart.items.find((item) => item.book.isbn === this.book.isbn);

      if (item) item.quantity++;
      else cart.items.push({ book: this.book, quantity: 1 });

      cart.total = 0;
      cart.items.forEach((item) => {
        cart.total += item.book.price * item.quantity;
        cart.total = Number.parseFloat(cart.total.toPrecision(3));
      });
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  }
}
