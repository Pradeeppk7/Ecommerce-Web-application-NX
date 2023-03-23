import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/Users.service';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  former!: FormGroup;
  currentUserId!: string;
  isSubmitted = false;
  password1 = null;
  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private router: Router
  ) { }
  ngOnInit(): void {
    this._initUserForm();
  }

  private _initUserForm() {
    this.former = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      password1:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }
  
  onSubmit() {
    if (this.userForm['password1'].value == this.userForm['password'].value) {
      this.isSubmitted = true;
      if (this.former.invalid) {
        return;
      }
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      password: this.userForm['password'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,
      country: this.userForm['country'].value
    };
    this._addUser(user);

  }
  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe
    ({
      next: (user: User) =>
      this.messageService.add({
        severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is Registered successfully`,
        }),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `User is not created`,
        }),
      complete: () =>
        setTimeout(() => this.router.navigate(['/login']), 1500),
    });
  }
  get userForm() {
    return this.former.controls;
  }
  onCancle() {
    this.location.back();
  }
  
}
