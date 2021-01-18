import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role === 'ADMIN') return true;
    else return false;
  }
}
