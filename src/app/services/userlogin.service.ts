import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { userlogin } from '../Models/userlogin';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  };


url:string="https://localhost:44378/api/User/Userlogin"

  constructor(private http: HttpClient) { }

  Login(newuser:userlogin):Observable<any>
  {
    return this.http.post<any>(this.url,newuser,this.httpOptions)
  }

   
}
