import { Component, OnInit } from '@angular/core';
import { productDetails } from '../shared/productDetails.model';
import { productListService } from '../shared/productList.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {
  public data: productDetails[] = [];
  stringifiedData: any;
  public isAdded: boolean = false;

  constructor(private http: HttpClient,private dataService: productListService) {
  //   this.data =  [
  //     {
  //         productId:1,
  //         productName:'cello-chair',
  //         productPrice:123,
  //         productCategory:'Furniture',
  //         productDescription:'Comfirtable',
  //         productImage:'https://reqres.in/img/faces/1-image.jpg'
  //     }
  // ];
   }

  ngOnInit(): void {
      this.dataService.getAllProducts().subscribe(response => {
        
        for (let i = 0; i < Object.keys(response).length; i++) {
          this.data.push({ 
            productId: response[i]['id'], 
            productName: response[i]['title'], 
            productPrice: response[i]['price'], 
            productCategory: response[i]['category'],
            productDescription : response[i]['description'],
            productImage : response[i]['image'] 
          });
        }
        this.dataService.data = this.data;
        // console.log("service data :::"+ this.data);
    });  
  }

  addToCart(id:number)
  {
    this.dataService.addToCart(id).subscribe(response =>{
        this.isAdded = true;
        setTimeout(() => {
          this.isAdded = false;
        }, 2000);
    });
  }

}
