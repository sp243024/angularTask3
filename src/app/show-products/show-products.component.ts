import { Component, OnDestroy, OnInit } from '@angular/core';
import { productDetails } from '../shared/productDetails.model';
import { productListService } from '../shared/productList.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit, OnDestroy {
  public data: productDetails[] = [];
  stringifiedData: any;
  public isAdded: boolean = false;
  public searchString:string;
  public isError: boolean=false;
  public errorMsg:string=null;
  public isLoading:boolean=true;

  constructor(private http: HttpClient,private dataService: productListService) {
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
    }, error =>{
      this.isError=true;
      this.errorMsg=error.message;
    });  
    this.isLoading=false;
  }

  addToCart(id:number):void
  {
    this.dataService.addToCart(id).subscribe(response =>{
        this.isAdded = true;
        setTimeout(() => {
          this.isAdded = false;
        }, 2000);
    }, error =>{
      this.isError=true;
      this.errorMsg=error.message;
    });
  }

  searchProducts():void { 
    let input = this.searchString; 
    input=input.toLowerCase(); 
    let x = document.getElementsByClassName('card'); 
    
    for (var i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().includes(input)) { 
        x[i].className="no-display";
      } 
      // else { 
      // 	x[i].className="list-item";				 
      // } 
    } 
  } 

  ngOnDestroy(){
    // this.dataService.unsubscribe();
  }

}
