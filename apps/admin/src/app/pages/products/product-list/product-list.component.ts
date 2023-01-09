import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@deepbits/products';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit,OnDestroy {
  products: Product[] = [];
  endsubs$: Subject<any> = new Subject();
  constructor(
    private productsService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this._getProducts();
  }
  ngOnDestroy(): void {
    
    this.endsubs$.complete();
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          (response) => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is Deleted Successfully!',
            });
          },

          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category could not be deleted',
            });
          }
        );
      },
    });
  }

  updateProduct(productID: string) {
    this.router.navigateByUrl(`products/form/${productID}`);
  }

  private _getProducts() {
    this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe((product) => {
      this.products = product;
    });
  }
}
