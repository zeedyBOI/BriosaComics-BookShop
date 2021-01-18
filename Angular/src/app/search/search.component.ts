import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../_models/book';
import { BookService } from '../_services/book/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
  private navigationSubscription!: Subscription;

  books: Book[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getBooks();
      }
    });
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }

  private getBooks(): void {
    const title = this.activatedRoute.snapshot.queryParamMap.get(
      'title'
    ) as string;
    this.bookService.searchBook(title).subscribe((books) => {
      this.books = books;
    });
  }
}
