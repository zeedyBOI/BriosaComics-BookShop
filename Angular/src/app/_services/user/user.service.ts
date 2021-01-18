import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { V4Options as UUID } from 'uuid';
import { User } from '../../_models/user';
import { Order } from 'src/app/_models/order';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL = 'http://localhost:8080/user/';
  private userSource = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem('user') || '{}')
  );

  currentUser = this.userSource.asObservable();

  constructor(private http: HttpClient) {}

  setCurrentUser(user: User): void {
    this.userSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  signUp(user: User): Observable<boolean> {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('address', user.address);
    formData.append('postalCode', user.postalCode);
    formData.append('phoneNumber', user.phoneNumber.toString());

    return this.http.post<boolean>(`${this.BASE_URL}register`, user);
  }

  login(email: string, password: string): Observable<User> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post<User>(`${this.BASE_URL}login`, {
      email,
      password,
    });
  }

  makeOrder(order: Order): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}order-book`, order);
  }

  getOrders(): Observable<any[]> {
    const userId = this.userSource.getValue().id as string;
    return this.http.get<any[]>(`${this.BASE_URL}orders`, {
      params: new HttpParams().set('userId', userId),
    });
  }
}
