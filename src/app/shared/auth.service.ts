import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class authService {

    private URL : string="https://reqres.in/api/";

    constructor(private http: HttpClient) {
        
    }

    public signUp(email:string, password:string){
        return this.http.post<any>(this.URL+'register',
            {  
                "email": email, 
                "password": password 
            } 
        );
    }

    public signIn(email:string, password:string){
        return this.http.post(this.URL+'login',
            {
                email: email,
                password: password
            }    
        );
    }
}