import { Component, OnInit } from '@angular/core';
import { productDetails } from '../shared/productDetails.model';
import { productListService } from '../shared/productList.service';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.css']
})
export class ShowCartComponent implements OnInit {
  public cartProducts:[{}];
  public productData: productDetails[] = [];
  public isMsg: boolean = false;
  public toastMsg : string ="";

  constructor(private dataService: productListService) { }

  ngOnInit(): void {
    this.getCartData(1);
  }

  public getCartData(id:number)
  {
    this.dataService.getCartData(id).subscribe(response => {
      this.cartProducts = response['products'];
    });

    this.dataService.getAllProducts().subscribe(response => {
      console.log(response);
      for (let i = 0; i < Object.keys(response).length; i++) {
        this.productData.push({ 
          productId: response[i]['id'], 
          productName: response[i]['title'], 
          productPrice: response[i]['price'], 
          productCategory: response[i]['category'],
          productDescription : response[i]['description'],
          productImage : response[i]['image'] 
        });
      }
  });  
  }
  public deleteFromCart(id:number)
  {
    // this.dataService.deleteFromCart();
    this.isMsg = true;
    this.toastMsg="Product deleted from Cart successfully";
      setTimeout(() => {
        this.isMsg = false;
      }, 2000);
  }

  public decreaseQuantity(id:number)
  {
    if(this.cartProducts[id]['quantity']>0)
    {
      this.cartProducts[id]['quantity']--;
    }
    else
    {
      this.isMsg = true;
      this.toastMsg="Product Quantity can not be less than 0";
        setTimeout(() => {
          this.isMsg = false;
        }, 2000);
    }
  }
  
  public increaseQuantity(id:number)
  {
    if(this.cartProducts[id]['quantity']<10)
    {
      this.cartProducts[id]['quantity']++;
    }
    else
    {
      this.isMsg = true;
      this.toastMsg="Product Quantity can not be more than 10";
        setTimeout(() => {
          this.isMsg = false;
        }, 2000);
    }
  }
}
