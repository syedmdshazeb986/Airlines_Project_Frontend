import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Airport } from '../Models/airport';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {

  url:string ="https://localhost:44378/api/User/airports"
  httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };
  
  constructor(private http: HttpClient) { }

  getAirports():Observable<Airport[]>{
    return this.http.get<Airport[]>(this.url)
  }
}
