import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or password is wrong';
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._initLoginform();
  }
  private _initLoginform() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) return;
    this.auth
      .login(this.loginForm['email'].value, this.loginForm['password'].value)
      .subscribe(
        (user) => {
          console.log(user);
          this.authError = false;
          this.localstorageService.setToken(user.token);
          this.router.navigate(['']);
          //this.router.navigate(['/dashboard']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.authError = true;
          if (error.status !== 400) {
            this.authMessage = 'Error in the server, please try again later !';
          }
        }
      );
    //<span *ngIf="loginForm['email'].errors">
  }
  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
