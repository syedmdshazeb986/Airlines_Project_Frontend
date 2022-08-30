import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminloginService {
  private apiServer = "https://localhost:44378/api/Admin/Userlogin";
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
responseType:'text' as 'json'
}
constructor(private httpClient: HttpClient) { }
login(data:any):Observable<any>
{
  return this.httpClient.post<any>(this.apiServer,data,this.httpOptions)
}
}
