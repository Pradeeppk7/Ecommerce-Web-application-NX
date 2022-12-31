import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, User } from '@deepbits/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


 
@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentUserId!: string;
  countries= [];

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    
    this._checkEditMode();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
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
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      password:this.userForm['password'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,
      country: this.userForm['country'].value
    };
    if (this.editmode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }
  
  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe
    ({
      next: (user: User) =>
      this.messageService.add({
        severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created`,
        }),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `User is not created`,
        }),
      complete: () =>
        setTimeout(() => this.router.navigate(['/users']), 1500),
    });
  }
  
 
  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.usersService.getUser(params['id']).subscribe((user) => {
          this.userForm['name'].setValue(user.name);
          this.userForm['email'].setValue(user.email);
          this.userForm['phone'].setValue(user.phone);
          this.userForm['isAdmin'].setValue(user.isAdmin);
          this.userForm['street'].setValue(user.street);
          this.userForm['apartment'].setValue(user.apartment);
          this.userForm['zip'].setValue(user.zip);
          this.userForm['city'].setValue(user.city);
          this.userForm['country'].setValue(user.country);

          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity();
        });
      }
    });
  }

  
  onCancle() {
    this.location.back();
  }

  get userForm() {
    return this.form.controls;
  }
}
