import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@deepbits/ui';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { CategoriesService, ProductsModule, ProductsService } from '@deepbits/products';
import { OrdersModule } from '@deepbits/orders';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  
];
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ProductsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    UiModule,
    AccordionModule,
    OrdersModule
  ],
  providers: [CategoriesService,ProductsService,],
  bootstrap: [AppComponent],
})
export class AppModule {}
