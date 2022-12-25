import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@deepbits/products';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted= false;
  editmode = false;
  currentCategoryId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color:['#fff']
    });
    this._checkEditMode();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id:this.currentCategoryId,
      name: this.catergoryForm['name'].value,
      icon: this.catergoryForm['icon'].value,
      color:this.catergoryForm['color'].value,
    };
    if (this.editmode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe({
      next: (category:Category) =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is created`,
        }),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Category is not created`,
        }),
      complete: () =>
        setTimeout(() => this.router.navigate(['/categories']), 1500),
    });
  }
  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe({
      next: (category: Category) =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is updated`,
        }),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category could not be created',
        }),
      complete: () =>
        setTimeout(() => this.router.navigate(['/categories']), 2000),
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentCategoryId = params['id'];
        this.categoriesService
          .getCategory(params['id'])
          .subscribe((category) => {
            this.catergoryForm['name'].setValue(category.name);
            this.catergoryForm['icon'].setValue(category.icon);
            this.catergoryForm['color'].setValue(category.color);
          });
      }
    });
  }
  get catergoryForm() {
    return this.form.controls;
  }
}
