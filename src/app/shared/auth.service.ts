import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from './user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class authService {
    userSub =new BehaviorSubject<user>(null);
    private URL : string="https://reqres.in/api/";
    public token:string;
    private tokenExpTimer:any;

    constructor(private http: HttpClient,private router:Router) {
        
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
        const expDate = new Date (3600*3600+1000); 
        const userdata = new user (email,id,_token,expDate);
        this.userSub.next(userdata);
        this.autoLogout(3600*3600+1000);
        localStorage.setItem('userData',JSON.stringify(userdata));
    }

    public logout(){
        this.userSub.next(null);
        this.router.navigateByUrl('/');
        localStorage.removeItem('userData');
        if(this.tokenExpTimer){
            clearTimeout(this.tokenExpTimer);
        }
        this.tokenExpTimer=null;
    }

    public autoLogout(expDuration : number){
        // console.log(expDuration);
        this.tokenExpTimer = setTimeout(()=>{
            this.logout();
        },expDuration);
    }

    public autoLogin(){
        const userData: { email:string,id: string,_token:string,_tokenExpDate:Date}
         = JSON.parse(localStorage.getItem('userData'));
        if(!userData)
        {
            return;
        }

        const loadedUser = new user(userData.email,userData.id,userData._token,new Date(userData._tokenExpDate));
        
        if(loadedUser.getToken){
            this.userSub.next(loadedUser);
            const expDuration = new Date(userData._tokenExpDate).getTime() - new Date().getTime();
            this.autoLogout(expDuration);
        }
        
    }
}