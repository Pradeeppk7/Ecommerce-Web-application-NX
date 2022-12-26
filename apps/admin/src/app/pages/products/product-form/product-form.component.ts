import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '@deepbits/products';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styles: [],
})
export class ProductFormComponent implements OnInit {
  editmode = false;
  form!: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private productServices: ProductsService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }
  onSubmit() {
    this.isSubmitted = false;
  }
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [''],
    });
  }
  get productForm() {
    return this.form.controls;
  }
}
