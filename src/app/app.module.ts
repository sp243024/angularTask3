import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ShowProductsComponent } from './products/show-products/show-products.component';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { productListService } from './shared/productList.service';
import { ShowCartComponent } from './show-cart/show-cart.component';
import { authIntercepterService} from './shared/authIntercepter.service';
import { authService } from './shared/auth.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { authGuard } from './shared/auth.guard';

const appRoutes: Routes = [
   { path: '', component: LoginComponent },
   { path: 'products', component: ShowProductsComponent, canActivate:[authGuard] },
   { path: 'products/:id', component: AddProductsComponent },
   { path: 'cart', component: ShowCartComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShowProductsComponent,
    ShowCartComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    FooterComponent,
    AddProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    productListService,
    authService,
    {
      provide:HTTP_INTERCEPTORS, 
      useClass: authIntercepterService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }