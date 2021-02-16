import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from 'rxjs/operators';

export class loginIntercepterService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        // console.log("Request is on way."); 
        const modifiedRequest = req.clone({headers: req.headers.append('Token','6CQPsZOpjl')});
        return next.handle(modifiedRequest).pipe(
            tap( event => {
                if (event.type === HttpEventType.Response){
                    //do something
                }
            })
            );
    }
}