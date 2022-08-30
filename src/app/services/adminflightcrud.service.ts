import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adminflight } from '../Models/adminflight';

@Injectable({
  providedIn: 'root'
})
export class AdminflightcrudService {
  url:string="http://localhost:53656/api/admin/"
  httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };
  
  constructor(private http: HttpClient) { }

  getAll():Observable<Adminflight[]>{
    return this.http.get<Adminflight[]>(this.url+"flights")
  }

  getByflightname(flightname:String):Observable<Adminflight>{
    return this.http.get<Adminflight>(this.url+"flight/"+flightname)
  }

  deleteflight(flightname: string){
    return this.http.delete<Adminflight>(this.url+"flight/"+flightname,this.httpOptions)
  }

  addflight(flight:any):Observable<any>{
    flight.depart_airport_id = parseInt(flight.depart_airport_id);
    flight.arrival_airport_id = parseInt(flight.arrival_airport_id);
    return this.http.post<any>(this.url+"addflight",JSON.stringify(flight), this.httpOptions)
  }
}
