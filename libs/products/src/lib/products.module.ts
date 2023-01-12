import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { OrdersModule } from '@deepbits/orders';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { ButtonModule } from 'primeng/button';
@NgModule({
  imports: [
    CommonModule,
    OrdersModule,
    HttpClientModule,
    ButtonModule,
    RouterModule,
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
  ],
})
export class ProductsModule {}
