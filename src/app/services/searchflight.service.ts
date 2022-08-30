import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchData } from '../Models/searchdata';
import { Searchflight } from '../Models/searchflight';

@Injectable({
  providedIn: 'root'
})
export class SearchflightService {
  private apiServer = "https://localhost:44378/api/User/flight/search";
  public source_airport_id:Number;
  public destination_airport_id:Number;
  public seats:number
  public date:Date
  public flightdata=[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

    SearchFlights(booking_type:String,source_airport_id:Number,destination_airport_id:Number,departure_time:Date,return_date:Date,adults:Number,childs:Number,infants:Number,class_type:String){
      
     return this.httpClient.post<SearchData[]>(this.apiServer,new Searchflight(booking_type,source_airport_id,destination_airport_id,departure_time,return_date,adults,childs,infants,class_type),this.httpOptions);
  }
}



