import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Passenger } from '../Models/passenger';
import { SelectedflightService } from './selectedflight.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'responseType':'text' as 'json'
  }
        private apiServer = "https://localhost:44378/api/User/booking"
        public passengers:any
        public seatArray = []
        public current_date : string
        public final_amount:number
        public card_details:any
        public useremail:any
        public seat_type:string
        public body:any
        public contact_email:string
        public contact_no:string
        public booked_information:any


  constructor(private httpClient: HttpClient, private SelectedFlightService: SelectedflightService) {             
  this.current_date = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
  this.useremail = sessionStorage.getItem('email');
  this.seat_type = this.SelectedFlightService.travel_status ? "business":"economy"}
  
  
  book(user_id:any,flight_id:any,booking_type:any,return_date:any,class_type:any,travel_date:any,payment_mode:any,passengers:Passenger[])
  {

      this.body = {
          "UserId": user_id,
          "FlightId": flight_id,
          "Booking_Type":booking_type,
          "Return_Date":return_date,
          "Class_Type":class_type,
          "Travel_date" : travel_date,
          "Payment_mode":payment_mode,
          "Passengers":passengers        
      }
     console.log(this.body)
      return this.httpClient.post(this.apiServer,this.body,this.httpOptions);
      
    
  }
}
