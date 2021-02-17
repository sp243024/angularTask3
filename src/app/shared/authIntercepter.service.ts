import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { authService } from "./auth.service";
import { exhaustMap,take } from 'rxjs/operators';

@Injectable()
export class authIntercepterService implements HttpInterceptor{
    
constructor(private authService:authService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler){
        // console.log("Request is on way.");
        this.authService.userSub.subscribe();
            return this.authService.userSub.pipe(
                take(1),
                exhaustMap(user=>{
                    if(!user)
                    {
                        return next.handle(req);
                    }
                    const modifiedRequest = req.clone({headers: req.headers.append('Token',user._token)});
                    return next.handle(modifiedRequest);
                })
        );
   
    }
}