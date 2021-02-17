import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { authService } from "./auth.service";
import { map,take } from "rxjs/operators";

@Injectable({providedIn:'root'})
export class authGuard implements CanActivate{

    constructor(private authService:authService,private router:Router)
    {

    }

    canActivate(route: ActivatedRouteSnapshot, router : RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>
    {
        return this.authService.userSub.pipe(
            take(1),
            map(user=>{
            const isAuth = !!user;
            if(isAuth){
                return true;
            }
            this.router.createUrlTree(['/']);
        }

        )
        );
    }
}