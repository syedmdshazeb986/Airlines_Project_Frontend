import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adminflight } from '../Models/adminflight';

@Injectable({
  providedIn: 'root'
})
export class AdminflightcrudService {
  url:string="https://localhost:44378/api/Admin/"
  httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };
  
  constructor(private http: HttpClient) { }

  getAll():Observable<Adminflight[]>{
    return this.http.get<Adminflight[]>(this.url+"flights")
  }

  getByflightname(FlightName:any):Observable<Adminflight>{
    return this.http.get<Adminflight>(this.url+"getByFlightName/"+FlightName)
  }

  deleteflight(FlightName: string){
    return this.http.delete<Adminflight>(this.url+"flight/"+FlightName,this.httpOptions)
  }

  addflight(flight:Adminflight):Observable<any>{
    //flight.depart_airport_id = parseInt(flight.depart_airport_id);
    //flight.arrival_airport_id = parseInt(flight.arrival_airport_id);
    return this.http.post<Adminflight>(this.url+"addflight",flight,this.httpOptions)
  }

}
