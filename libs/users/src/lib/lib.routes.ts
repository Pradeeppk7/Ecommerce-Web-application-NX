import { Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register/register.component';

export const usersRoutes: Route[] = [
    {
        path:'login', component:LoginComponent
    },
    {
        path: 'register',
        component:RegisterComponent
    }
];
