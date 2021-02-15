import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ShowProductsComponent } from './show-products/show-products.component';
import { productListService } from './shared/productList.service';
import { ShowCartComponent } from './show-cart/show-cart.component';
// import { AppRoutingModule} from './app-routing.module';

const appRoutes: Routes = [
   { path: '', component: LoginComponent },
   { path: 'products', component: ShowProductsComponent },
   { path: 'cart', component: ShowCartComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShowProductsComponent,
    ShowCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    HttpClientModule,
    Ng2SearchPipeModule,
    // AppRoutingModule
  ],
  providers: [productListService],
  bootstrap: [AppComponent]
})
export class AppModule { }