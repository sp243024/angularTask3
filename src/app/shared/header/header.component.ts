import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { authService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  public isAunthenticated : boolean=false;
  constructor(private authService:authService, private router:Router) { }

  ngOnInit(): void {
    this.userSub = this.authService.userSub.subscribe(user=>{
      this.isAunthenticated=!!user;
      // console.log(user);
      // this.isAunthenticated=false;
      // if(!user)
      // {
      //   this.isAunthenticated=false;
      // }
    });
  }

  ngOnDestroy():void{
    this.userSub.unsubscribe();
  }

  public onLogout(){
    this.authService.logout();
    this.isAunthenticated=false;
    this.router.navigateByUrl('/');
  }
}
