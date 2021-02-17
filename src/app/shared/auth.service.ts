import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from './user.model';
import { tap } from 'rxjs/operators';


@Injectable()
export class authService {
    userSub =new BehaviorSubject<user>(null);
    private URL : string="https://reqres.in/api/";
    public token:string;

    constructor(private http: HttpClient) {
        
    }

    public signUp(email:string, password:string){
        return this.http.post<any>(this.URL+'register',
            {  
                "email": email, 
                "password": password 
            } 
        ).pipe(tap(response=>{
            this.handleAuthentication("temp@123.com",response.id, response.token,new Date());
            }
        )
        );
    }

    public signIn(email:string, password:string){
        return this.http.post<any>(this.URL+'login',
            {
                email: email,
                password: password
            }    
        ).pipe(tap(response=>{
            this.handleAuthentication("temp@123.com","123", response.token,new Date());
            }
        )
        );
    }

    private handleAuthentication(email:string,id:string,_token:string,_tokenExpDate:Date){
        const expDate = new Date (_tokenExpDate.getTime()+100*1000); 
        const userdata = new user (email,id,_token,expDate);
        this.userSub.next(userdata);

    }

    public logout(){
        this.userSub.next(null);
    }
}