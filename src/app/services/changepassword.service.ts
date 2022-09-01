import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Changepassword } from '../Models/changepassword';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

url:string="https://localhost:44378/api/User/changepassword"
  
   httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };

  
  constructor(private http: HttpClient) { }
  Reset(data:any):Observable<Changepassword>{
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };
    return this.http.post<Changepassword>(this.url,data,this.httpOptions)
  }
}