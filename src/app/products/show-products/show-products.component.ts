import { Component, OnDestroy, OnInit } from '@angular/core';
import { productDetails } from '../../shared/productDetails.model';
import { productListService } from '../../shared/productList.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit, OnDestroy {
  public data: productDetails[] = [];
  stringifiedData: any;
  public searchString: string;
  public isError: boolean = false;
  public errorMsg: string = null;
  public isLoading: boolean = true;
  filterTerm: string;
  public pageNumber: number = 1;

  constructor(private http: HttpClient, 
              private dataService: productListService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.dataService.getAllProducts().subscribe(response => {

      for (let i = 0; i < Object.keys(response).length; i++) {
        this.data.push({
          productId: response[i]['id'],
          productName: response[i]['title'],
          productPrice: response[i]['price'],
          productCategory: response[i]['category'],
          productDescription: response[i]['description'],
          productImage: response[i]['image']
        });
      }
      this.dataService.data = this.data;
      // console.log("service data :::"+ this.data);
    }, error => {
      this.isError = true;
      this.errorMsg = error.message;
    });
    this.isLoading = false;
  }

  public addToCart(id: number): void {
    this.dataService.addToCart(id).subscribe(response => {
      this.toastr.success('Product Added to cart successfully');  
    }, error => {
      this.isError = true;
      this.errorMsg = error.message;
    });
  }

  public deleteProduct(id: number): void {
    if (confirm("Delete this Product?")) {
      this.dataService.deleteProduct(id).subscribe(response => {
        this.data.splice(id, 1);
        this.toastr.success('Product deleted from Cart successfully');   
      });
    }
  }

  ngOnDestroy() {
    // this.dataService.unsubscribe();
  }

}
