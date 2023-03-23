import { Route } from '@angular/router';
import { AuthGuard } from '@deepbits/users';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { Parent1Component } from './parent1/parent1.component';
import { ShellComponent } from './shared/shell/shell.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        component: DasboardComponent
      }, {
        path:'categories',component: CategoriesListComponent,
      },
      {
        path:'categories/form',component: CategoriesFormComponent,
      },
      {
        path:'categories/form/:id',component: CategoriesFormComponent,
      }, {
        path:'products',component: ProductListComponent,
      },
      {
        path:'products/form',component: ProductFormComponent,
      },
      {
        path:'products/form/:id',component: ProductFormComponent,
      }, {
        path:'users',component: UserListComponent,
      },
      {
        path:'users/form',component: UserFormComponent,
      },
      {
        path:'users/form/:id',component: UserFormComponent,
      },
      {
        path:'orders',component: OrdersListComponent,
      },
      {
        path:'orders/:id',component: OrdersDetailComponent,
      },
    ],
  },{
    path:'test',component:Parent1Component,
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch:'full'
  }
];
