import { Route } from '@angular/router';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { ShellComponent } from './shared/shell/shell.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DasboardComponent
      }, {
        path:'categories',component: CategoriesListComponent,
      },
    ],
  },
];
