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
    
    public deleteProduct(id:number){
        return this.http.delete(this.URL+'products/6');
    }

    public getCartData(id:number){
        return this.http.get<any>(this.URL+'carts/'+id);
    }

    public updateProduct(id:number,data:productDetails){
        return this.http.put(this.URL+'products/'+id,{
            title: data.productName,
            price: data.productPrice,
            description: data.productDescription,
            image: 'https://i.pravatar.cc',
            category: data.productCategory
        });
    } 

    public addProduct(data:productDetails){
        return this.http.post(this.URL+'products',{
            title: data.productName,
            price: data.productPrice,
            description: data.productDescription,
            image: 'https://i.pravatar.cc',
            category: data.productCategory
        });
    } 
}