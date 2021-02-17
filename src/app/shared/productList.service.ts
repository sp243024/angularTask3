import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { authService } from './auth.service';
import { productDetails } from './productDetails.model';

@Injectable()
export class productListService implements OnInit {

    public data: productDetails[] = [];
    private URL : string="https://fakestoreapi.com/";

    constructor(private http: HttpClient,private authService : authService) {
    }

    ngOnInit(): void { }

    public getAllProducts() {
        return this.http.get<productDetails[]>(this.URL+'products');        
    }
    
    public addToCart(id:number) {
        return this.http.post<any>
            (this.URL+'carts',
            '{"userId" : 1, "date" : ,products:[{productId:this.data[id][productId],quantity:1}}'
            );
    }
    
    public getCartData(id:number){
        return this.http.get<any>(this.URL+'carts/'+id);
    }
}