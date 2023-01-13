import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit{
  products: Product[] = [];
  categories: Category[]=[];
  constructor(private productService: ProductsService, private categoryService:CategoriesService) { }

  ngOnInit(): void {
    this._getCategories();
    this._getProducts();
  }
  private _getProducts(categoriesFilter?:string[]) {
    this.productService.getProducts(categoriesFilter).subscribe((products) => {
      this.products = products;
    })
  }
  private _getCategories() {
    this.categoryService.getCategories().subscribe((cat) => {
      this.categories = cat;
    })
  }
  categoryFilter() {
    const selectedCategories: any[] = this.categories.filter(category => category.checked).map(category=>category.id);
    this._getProducts(selectedCategories);
  }
  convert(data: number) {
    return data.toString(data);
  }
}
