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
import {
  CategoriesService,
  ProductsModule,
  ProductsService,
} from '@deepbits/products';
import { OrdersModule } from '@deepbits/orders';
import { MessagesComponent } from './shared/messages/messages.component';

import { UsersModule } from '@deepbits/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
import { MainComponent } from './pages/main/main.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LoginComponent } from 'libs/users/src/lib/pages/login/login.component';

const routes: Routes = [{ path: '', component: HomePageComponent }, {
  path:'login',component:LoginComponent,
},{
  path: '**',
  redirectTo: '/',
  pathMatch:'full'
}];
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MessagesComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ProductsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(routes),
    UiModule,
    AccordionModule,
    OrdersModule,
    ToastModule,
    UsersModule,
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
    ],
  providers: [CategoriesService, ProductsService,MessageService],
  bootstrap: [AppComponent],
  exports: [MessagesComponent],
})
export class AppModule {}
