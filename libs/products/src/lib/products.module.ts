import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { OrdersModule } from '@deepbits/orders';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
//ui
import { ButtonModule } from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: 'products', component:ProductsListComponent
  },
  {
    path: 'category/:categoryid', component:ProductsListComponent
  },
]
@NgModule({
  imports: [
    CommonModule,
    OrdersModule,
    HttpClientModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductsListComponent,
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductsListComponent,
  ],
})
export class ProductsModule {}
