import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookinghistoryService {
    private apiServer = "https://localhost:44378/api/User/getbookings/";
    private getcancelbookingsapiServer = "https://localhost:44378/api/User/getcancelledbookings/";
    private cancelapiServer="https://localhost:44378/api/User/cancelbooking/"
    userId:number
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'responseType':'text' as 'json'
   
  }
   constructor(private httpClient: HttpClient) {

    this.userId = Number(sessionStorage.getItem('userid'))

    }
    getbookeddata(id:any){
        return this.httpClient.get<[]>(this.apiServer+this.userId);
    }
    getcancelledbookings(id:any){
      return this.httpClient.get<[]>(this.getcancelbookingsapiServer+this.userId);
  }

 cancelticket(id:any)
    {
      return this.httpClient.get(this.cancelapiServer+id,this.httpOptions);
    }
  }
