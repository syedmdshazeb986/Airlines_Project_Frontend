import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getflightPrice } from '../Models/getflightprice';
import { Seat } from '../Models/seat';

@Injectable({
  providedIn: 'root'
})
export class SelectedflightService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) {
  }
  private apiServer = "https://localhost:44378/api/User/flight/";


  public departure_location:string
  public arrival_location:string
  public flight_number:number
  public travel_date:Date
  public number_of_seats:number
  public travel_status:boolean
  public GetFlightPrice:getflightPrice
  public flightobj = {}

  async postdata(obj:any)
  {
      this.departure_location = obj.departure_location
      this.arrival_location = obj.arrival_location
      this.flight_number = obj.flight_number
      this.travel_date = obj.travel_date
      this.number_of_seats = obj.number_of_seats
      this.travel_status = obj.classstate
      this.flightobj = obj
  }
 getFlightPrice(flightId:any,seat_type:any)
  {
    this.GetFlightPrice.FlightId=flightId;
    this.GetFlightPrice.SeatType=seat_type;
      return this.httpClient.post<number>(this.apiServer,this.GetFlightPrice,this.httpOptions); 
  }

  getSeatsByFlightId(id:any){
    return this.httpClient.get<Seat[]>(this.apiServer+id,this.httpOptions);
  }

}
    


