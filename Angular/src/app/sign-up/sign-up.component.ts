import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  submitted = false;
  emailExists = false;

  @ViewChild('notiflix') notiflix!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      address: ['', Validators.required],
      postalCode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^\\d{4}[- ]{0,1}\\d{3}$'),
        ]),
      ],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
        ]),
      ],
    });
  }

  get form() {
    return this.signUpForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signUpForm.invalid) return;

    const newUser: User = {
      name: this.signUpForm.controls.name.value,
      email: this.signUpForm.controls.email.value,
      password: this.signUpForm.controls.password.value,
      address: this.signUpForm.controls.address.value,
      postalCode: this.signUpForm.controls.postalCode.value,
      phoneNumber: this.signUpForm.controls.phoneNumber.value,
      role: 'USER'
    };

    this.userService
      .signUp(newUser)
      .subscribe((result) => {
        this.emailExists = !result;
        if (!this.emailExists) {
          this.submitted = false;
          this.signUpForm.reset();
          this.notiflix.nativeElement.click();
        }
      }
      );
  }
}
