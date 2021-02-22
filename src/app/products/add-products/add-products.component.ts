import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productDetails } from 'src/app/shared/productDetails.model';
import { productListService } from 'src/app/shared/productList.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  public pageTitle:string = "Add Product";
  public productDetails: productDetails;
  constructor(private route: ActivatedRoute,
              private router:Router,
              private dataService: productListService, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.id !== "new") {
      this.productDetails = this.dataService.data[this.route.snapshot.params.id];
      this.pageTitle = "Edit Product";
    } else {
      this.productDetails = { productId: null, productName: "", productPrice: null, productCategory:"", productDescription:"",productImage:"" };
    }
  }

  public onSubmit(){
    if (this.route.snapshot.params.id !== "new") {
      this.dataService.updateProduct(this.route.snapshot.params.id,this.productDetails).subscribe(response=>
      {
        // console.log(response);  
        this.toastr.success('Product Updated Successfully'); 
        this.router.navigateByUrl('/products');
      });
    } else {
      this.dataService.addProduct(this.productDetails).subscribe(response=>
        {
          // console.log(response);
          this.toastr.success('New Product Added Successfully');           
          this.router.navigateByUrl('/products');
        });
    }
  }
}
