import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchseatsService } from 'src/app/services/fetchseats.service';
import Swal from 'sweetalert2';
import { Seat } from '../../Models/seat';
import { SelectedflightService } from '../../services/selectedflight.service';
import { TransactionService } from '../../services/transaction.service';
import { SharedserviceService } from '../../sharedservice.service';

@Component({
  selector: 'app-seatui',
  templateUrl: './seatui.component.html',
  styleUrls: ['./seatui.component.css']
})
export class SeatuiComponent implements OnInit {

  constructor(private flightselected:SelectedflightService,private sharedservice:SharedserviceService,private seatService : FetchseatsService, public TransactionService:TransactionService, public router: Router,public route:ActivatedRoute) {   }
  seatsArray:any=[]

  selectedArray:any=[]
  bookedArray:any=[]
  passenger:any
  public response:any | null=JSON.parse(localStorage.getItem('usercred') || ('null')) 
  seats:any
  bookedseats:any
  booking_type:any;
  class_type:any;
  flightdetails:any;
    ngOnInit(): void
  
    {
  
      this.passenger=this.sharedservice.getPassengers()
      this.booking_type=this.route.snapshot.paramMap.get('booking_type');
      this.class_type=this.route.snapshot.paramMap.get('class_type');

      this.flightdetails=this.sharedservice.getAeroplaneCardData()
      console.log(this.booking_type)
      console.log(this.class_type)
      let totalSeats:any=30;
       
      for(let i=0;i<totalSeats;i++)
  
      {
        if(this.class_type=='business')
          this.seatsArray.push(i+1);
        else
          this.seatsArray.push(30+i)
      }
    
      this.flightselected.getSeatsByFlightId(this.flightdetails.flightId).subscribe(d=>{
        console.log(d)
        this.seats=d.filter(i=>i.seatType==this.class_type);

        this.bookedseats=d.filter(i=>i.is_booked==true && i.seatType==this.class_type);
        console.log(this.bookedseats)
        console.log

        for(let i=0;i<this.bookedseats.length;i++){
          this.bookedArray.push(this.bookedseats[i].seatId)
        }
        console.log(this.bookedArray)
      });

  
    }
  
    checkAvailable(i:any)
  
    {
  
      if(this.bookedArray.indexOf(i) > -1)
  
      {
  
          return;
  
      } 
      if(!this.selectedArray.includes(i))

  {

      this.selectedArray.push(i);



  }

  else

  {

      let index=this.selectedArray.indexOf(i)

      this.selectedArray.splice(index,1)

  }

  console.log(this.selectedArray)

}

disable(item:any)

{

  if(this.bookedArray.indexOf(item) > -1){

      return true;  /// call backend to send

  }else{

      return false;

  }



}

check(item:any){

  if(this.selectedArray.includes(item)){

      return true;

  }

  else{

      return false;

  }

}

submitSeats(){

      localStorage.setItem('seats',JSON.stringify(this.selectedArray));  
      this.router.navigate(['/payment'])
      let msg:any='Seat selected Succesfully'
      alert(msg);
      if(this.selectedArray.length == this.passenger.length)
      {
        for(let i=0;i<this.passenger.length;i++){

          this.passenger[i].SeatId=this.selectedArray[i];
          console.log(this.passenger)
        }
        this.TransactionService.seatArray = this.selectedArray
        this.router.navigate([`${'flight/payment'}`,{passengers:JSON.stringify(this.passenger),booking_type:this.booking_type,class_type:this.class_type,flight:JSON.stringify(this.flightdetails)}]);
      }
      else 
      Swal.fire('oops', 'Select only one Seat', 'error')
  
  
  
  }

}
