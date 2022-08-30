import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginserviceService {
  private apiServer = "https://localhost:44378/api/User/";
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  'responseType':'text' as 'json'
}
user:number;

constructor(private httpClient: HttpClient) { }
getUserData(email:any){
  return this.httpClient.get(this.apiServer+email);
}
login(data:any)
{
     return this.httpClient.post(this.apiServer+"login",data,this.httpOptions);
}
getWalletDetails(userId:any){
  this.user=Number(sessionStorage.getItem('userid'))
  return this.httpClient.post(this.apiServer+"wallet/"+this.user,this.httpOptions);
}

}
