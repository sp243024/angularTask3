import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { authService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName : string;
  public password : string;
  public isLoginMode: boolean=true;
  public isLoading:boolean=false;
  public isError: boolean=false;
  public errorMsg:string=null;

  constructor(private router: Router, private authService: authService) { }

  ngOnInit(): void {
  }

  public onLogin()
  {
    if(this.userName=="abc@bacancy.com" && this.password=="bacancy")
    {
      // this.router.navigate(['/home1']);
      this.router.navigateByUrl('/products');
    }
    else
    {
    }
  }

  public onSwitchMode():void
  {
    this.isLoginMode =!this.isLoginMode;
    this.isError=false;
  }

  public onSubmit(form: NgForm):void
  {
    const email = form.value.userName;
    const password=form.value.password;

    this.isLoading=true;
    if(this.isLoginMode)
    {
      this.authService.signIn(email,password).subscribe(
        response =>{
          console.log(response);
          this.isLoading=false;
          this.router.navigateByUrl('/products');
        },
        error=>{
          console.log(error);
          this.isLoading=false;
          this.isError=true;
          this.errorMsg="Invalid Username or Password";
        }
      );
    }
    else
    {
      this.authService.signUp(email,password).subscribe(
        response =>{
          console.log(response);
          this.isLoading=false;
        },
        error=>{
          console.log(error);
          this.isLoading=false;
          this.isError=true;
          this.errorMsg="An error occured.";
        }
      );
    }
     form.reset();
  }
}
