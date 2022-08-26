import { HttpClient, HttpHeaders,HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { usersignup } from 'src/app/Models/usersignup';

@Injectable({
  providedIn: 'root'
})
export class UsersignupService {

    httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
  

  url:string="https://localhost:44378/api/User/registration"

  constructor(private http: HttpClient) { }

  RegisterUser(newuser:usersignup):Observable<any>
  {
  
    return this.http.post<any>(this.url,newuser,this.httpOptions)
  }
  
}
