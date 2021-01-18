import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  wrongCredentials = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  onSubmit(): void {
    this.userService
      .login(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
      .subscribe((user) => {
        this.wrongCredentials = !!!user;
        if (!this.wrongCredentials) {
          this.userService.setCurrentUser(user);

          const destination = this.activatedRoute.snapshot.queryParamMap.get(
            'redirecTo'
          );
          if (destination) this.router.navigate([`/${destination}`]);
          else this.router.navigate(['/']);
        }
      });
  }
}
