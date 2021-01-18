import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../_models/book';
import { BookService } from '../_services/book/book.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css'],
})
export class ManageBooksComponent implements OnInit {
  private selectedFile!: File;

  addBookForm!: FormGroup;
  books: Book[] = [];
  submitted = false;
  isbnAlreadyExists = false;
  titleAndEditionAlreadyExists = false;

  @ViewChild('notiflix') notiflix!: ElementRef;
  @ViewChild('notiflixDeleted') notiflixDeleted!: ElementRef;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      edition: ['', Validators.required],
      publisher: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
    });

    this.bookService.getBooks().subscribe((books) => (this.books = books));
  }

  get form() {
    return this.addBookForm.controls;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (this.addBookForm.invalid) return;

    const newBook: Book = this.addBookForm.value as Book;
    const price: string = (this.addBookForm.controls.price
      .value as string).replace(',', '.');
    newBook.price = Number.parseFloat(price);
    newBook.image = this.selectedFile;

    const res = await this.bookService.addBook(newBook);
    res.subscribe(
      (response) => {
        if (response === null) {
          jQuery('#addBookModal').modal('hide');
          this.addBookForm.reset();
          this.submitted = false;
          this.notiflix.nativeElement.click();

          this.isbnAlreadyExists = false;
          this.titleAndEditionAlreadyExists = false;

          this.books.push(newBook);
        }
      },
      (error) => {
        const message: string = error.error.text;

        if (message.includes('com o isbn')) this.isbnAlreadyExists = true;
        else this.isbnAlreadyExists = false;

        if (message.includes('com o título'))
          this.titleAndEditionAlreadyExists = true;
        else this.titleAndEditionAlreadyExists = false;
      }
    );
  }

  deleteBook(isbn: number, image: string | File): void {
    this.bookService.deleteBook(isbn, image as string).subscribe((next) => {
      this.books = this.books.filter((book) => book.isbn !== isbn);
      this.notiflixDeleted.nativeElement.click();
    });
  }
}
