import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { V4Options as UUID } from 'uuid';
import { User } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly BASE_URL = 'http://localhost:8080/admin/';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}orders`);
  }

  getUser(id: UUID): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}user/${id}`);
  }

  confirmOrderDispatch(id: UUID): Observable<void> {
    return this.http.put<void>(
      `${this.BASE_URL}confirm-order-dispatch/${id}`,
      {}
    );
  }
}
