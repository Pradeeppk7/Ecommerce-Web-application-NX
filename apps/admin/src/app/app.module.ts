import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
//UI
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { CategoriesService } from '@deepbits/products';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';

const UX_MODULE = [CardModule, ToolbarModule, ButtonModule, TableModule];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DasboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    ...UX_MODULE,
  ],
  providers: [CategoriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
