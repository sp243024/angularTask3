import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName : string;
  public password : string;
  public isMsg : boolean = false;
  public toastMsg : string;

  constructor(private router: Router) { }

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
      this.isMsg = true;
      this.toastMsg="Invalid Username or Password.";
      setTimeout(() => {
        this.isMsg = false;
      }, 2000);
    }
  }

  public onClear()
  {
    this.userName="";
    this.password="";
  }
}
