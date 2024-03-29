import { NgModule } from '@angular/core';
import { CategoriesService, ProductsService } from '@deepbits/products';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor, UsersModule } from '@deepbits/users';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';

//UI
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { Parent1Component } from './parent1/parent1.component';
import { Child1Component } from './child1/child1.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
//import { FormBuilder } from '@angular/forms';
const UX_MODULE = [
  ButtonModule,
  CardModule,
  FieldsetModule,
  TagModule,
  ToolbarModule,
  InputTextModule,
  TableModule,
  ToastModule,
  EditorModule,
  ColorPickerModule,
  ConfirmDialogModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  InputMaskModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DasboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductListComponent,
    ProductFormComponent,
    UserListComponent,
    UserFormComponent,
    OrdersListComponent,
    OrdersDetailComponent,
    Parent1Component,
    Child1Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //FormBuilder,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ReactiveFormsModule,
    UsersModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    ...UX_MODULE,
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    ProductsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
