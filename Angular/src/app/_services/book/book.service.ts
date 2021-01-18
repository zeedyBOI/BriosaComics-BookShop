import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Book } from '../../_models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly BASE_URL = 'http://localhost:8080/admin/';

  constructor(
    private http: HttpClient,
    private fireStorage: AngularFireStorage
  ) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.BASE_URL}get-books`);
  }

  getBook(isbn: number): Observable<Book> {
    return this.http.get<Book>(`${this.BASE_URL}get-book/${isbn}`);
  }

  searchBook(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(
      `http://localhost:8080/user/search-book/${title}`
    );
  }

  async addBook(book: Book): Promise<Observable<string>> {
    book.image = await this.uploadImage(book.image as File);
    return this.http.post<string>(`${this.BASE_URL}add-book`, book);
  }

  deleteBook(isbn: number, image: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}delete-book/${isbn}`);
  }

  private async uploadImage(image: File): Promise<string> {
    // const path = `${Date.now()}_${image.name}`;
    const path = image.name;
    console.log(path);
    const task = await this.fireStorage.upload(path, image);
    const downloadURL = await this.fireStorage
      .ref(path)
      .getDownloadURL()
      .toPromise();
    console.log(downloadURL);
    return downloadURL;
  }
}
