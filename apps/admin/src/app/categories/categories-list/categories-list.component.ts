import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@deepbits/products';
import { ConfirmationService, ConfirmEventType,MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private confirmationService: ConfirmationService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          (response) => {
            this._getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is Deleted!',
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
      }
     
    });
    
  }
  updateCategory(categoryid: string) {
    this.router.navigateByUrl(`categories/form/${categoryid}`)
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }
}
