import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchflightService } from 'src/app/services/searchflight.service';
import { SelectedflightService } from 'src/app/services/selectedflight.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { SharedserviceService } from 'src/app/sharedservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eticket',
  templateUrl: './eticket.component.html',
  styleUrls: ['./eticket.component.css']
})
export class EticketComponent implements OnInit {
  public eticketdetails:any;
  flights: any[];
  departure: Number;
  arrival: Number;
  passengers: any;
  amount: any;

  public noofseats:any

  flight_number: number;
  travel_date: any;
  transaction_id:any;
  booking_date:any;
  arrival_time:number;
  departure_time:Number;
  flightdetails:any;
  userid:number;

  constructor(private sharedservice:SharedserviceService,private eticket:TransactionService, private searchservice:SearchflightService,public flightselected:SelectedflightService,private router:Router) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem("userid"))
    {
      Swal.fire({
        title: 'Oops!',
        text: 'Login to Continue!',
        icon: 'warning',
       
      })
      this.router.navigate([`${'userlogin'}`]);
    }
 
   this.passengers=this.sharedservice.getPassengers()
   this.flightdetails=this.sharedservice.getAeroplaneCardData()
   this.userid=this.sharedservice.getuserid()
   this.eticket.getbookingIdbyUserId(this.userid).subscribe(data =>{
    this.transaction_id=data;
   })
   this.booking_date=new Date();
console.log(this.passengers)
console.log(this.flightdetails)
this.flight_number=this.flightdetails.flightId;
this.departure=this.flightdetails.source_city;
this.arrival=this.flightdetails.destination_city;
this.departure_time=this.flightdetails.departure_Time;
this.arrival_time=this.flightdetails.arrival_Time;
this.amount=this.sharedservice.getAmount()
  }
}
