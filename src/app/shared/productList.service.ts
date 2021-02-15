import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { productDetails } from './productDetails.model';

@Injectable()
export class productListService implements OnInit {

    public data: productDetails[] = [];
    private URL : string="https://fakestoreapi.com/";

    constructor(private http: HttpClient) {
        // this.getData();
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

    // public onDelete(id: number) {
    //     this.http.put('https://reqres.in/api/users/' + id, '').subscribe(posts => {
    //         console.log(posts);
    //         this.deletedMsg = posts['updatedAt'];
    //     });
    // }
    // public onAdd(recordDetails: recordType) {
    //     this.http.post('https://reqres.in/api/users', '{ "name": recordDetails.firstName, "job": recordDetails.lastName }').subscribe(posts => {
    //         console.log("Got Response From Server...");
    //         console.log(posts);
    //     });
    // }
    // public onUpdate(recordDetails: recordType) {
    //     this.http.put('https://reqres.in/api/users/' + recordDetails.id, '{ "name": recordDetails.firstName, "job": recordDetails.lastName }').subscribe(posts => {
    //         console.log("Got Response From Server...");
    //         console.log(posts);
    //     });
    //}
}