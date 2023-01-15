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
import { UiModule } from '@deepbits/ui';
//ui
import {InputNumberModule} from 'primeng/inputnumber';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import {RatingModule} from 'primeng/rating';
const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: 'category/:categoryid',
    component: ProductsListComponent,
  },
  {
    path: 'products/:productid',
    component: ProductPageComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    OrdersModule,
    HttpClientModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    RouterModule.forChild(routes),
    UiModule
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
})
export class ProductsModule {}
