import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@deepbits/products';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styles: [],
})
export class ProductFormComponent implements OnInit {
  editmode = false;
  form!: FormGroup;
  imageDisplay!: string | ArrayBuffer | null |undefined;
  isSubmitted = false;
  categories: Category[] = [];
  currentProductId!: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,  
    private messageService: MessageService,
    
    ) {}
    
    ngOnInit(): void {
      this._initForm();
      this._getCategories();
      this._checkEditMode();
    }

  private _updateProduct(productFormData:FormData) {
    this.productsService.updateProduct(productFormData,this.currentProductId).subscribe({
      next: (Product:Product) =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${Product.name} is updated successfully`,
        }),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Product is not updated`,
        }),
      complete: () =>
        setTimeout(() => this.router.navigate(['/products']), 1500),
    });
  };
  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentProductId = params['id'];
        this.productsService.getProduct(params['id']).subscribe((product) => {
          this.productForm['name'].setValue(product.name);
          this.productForm['category'].setValue(product.category?.id);
          this.productForm['brand'].setValue(product.brand);
          this.productForm['price'].setValue(product.price);
          this.productForm['countInStock'].setValue(product.countInStock);
          this.productForm['isFeatured'].setValue(product.isFeatured);
          this.productForm['description'].setValue(product.description);
          this.productForm['richDescription'].setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm['image'].setValidators([]);
          this.productForm['image'].updateValueAndValidity();
          

          });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      console.log(key);
      console.log(this.productForm[key].value);
      productFormData.append(key, this.productForm[key].value);
    });
    if (this.editmode) {
      this._updateProduct(productFormData);
     }
    else {
      this._addProduct(productFormData);
    }
  }
  private _addProduct(productData: FormData
  ) {
    this.productsService.createProduct(productData).subscribe({
      next: (Product:Product) =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${Product.name} is created`,
        }),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Product is not created`,
        }),
      complete: () =>
        setTimeout(() => this.router.navigate(['/products']), 1500),
    });
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
      image: ['',Validators.required],
      isFeatured: [false],
    });
  }
  private _getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }
  onImageUpload(event:any){
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }
  get productForm() {
    return this.form.controls;
  }
}
