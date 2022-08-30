import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Passenger } from 'src/app/Models/passenger';
import { Seat } from 'src/app/Models/seat';
import { FetchseatsService } from 'src/app/services/fetchseats.service';
import { SelectedflightService } from 'src/app/services/selectedflight.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { SharedserviceService } from 'src/app/sharedservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {

    constructor(private sharedservice:SharedserviceService,public flightselected:SelectedflightService, public fetchseats:FetchseatsService,public router : Router,public TransactionService:TransactionService,private route:ActivatedRoute ) { }
  
    public count :number=0;
    public seatprice:any;
    public data:any;
    public totalprice:number
    passenger = new Passenger()
    public isLoggedIn: boolean = false
    public dataarray:Passenger[] = []
    public booking_type:any;
    public class_type:any;
    public i:number=26;
    public seats:any;
    public leftseats:Seat[];
   
      ngOnInit(): void {
        if(!sessionStorage.getItem('userid'))
        {
          Swal.fire({
            title: 'Oops!',
            text: 'Login to Continue!',
            icon: 'warning',
           
          })
          this.router.navigate([`${'userlogin'}`]);
        }
          else 
          {
          this.isLoggedIn = true
          }
          
          this.data = this.sharedservice.getAeroplaneCardData()
          this.flightselected.getSeatsByFlightId(this.data.flightId).subscribe(d=>{
            console.log(d)
            this.seats=d;

            this.leftseats=d.filter(i=>i.is_booked==false && i.seatType==this.class_type);
            console.log(this.leftseats)
          });
          this.booking_type=this.route.snapshot.paramMap.get('booking_type');
          console.log(this.booking_type)
          this.class_type=this.route.snapshot.paramMap.get('class_type');
          console.log(this.class_type)
          this.passenger.Gender="Male";
          this.passenger.SeatId=this.i++;
          this.dataarray.push(this.passenger)
          
          this.count =1;
          // this.fetchprice()
          this.seatprice=this.class_type=="economic"?this.data.economic_fare:this.data.business_fare;
          console.log(this.seatprice)
          this.totalprice=this.seatprice+708;

          
      }
        
check(count:any):any{
  if(count>this.leftseats.length){
    return true;
  }
  else if(count<=this.leftseats.length){
    return false;
  }
}

        onAdd()
        {
          
          if(this.count<=this.leftseats.length)
          {
            this.passenger = new Passenger()
            this.passenger.Gender='Male';
            this.passenger.SeatId=23;
            console.log(this.passenger)
            this.dataarray.push(this.passenger)
            this.count++;
            
          }
          console.log(this.dataarray);
        }
   
      onSubmit()
        {

          console.log(this.dataarray);

          for(let i=0;i<this.dataarray.length;i++){
            var emailregex =  new RegExp ("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
            var phoneregex = new RegExp("^[0-9]{10}$")
  
           
            if(!emailregex.test(this.dataarray[i].Email) || !phoneregex.test(this.dataarray[i].Phone_Number))
            {
              console.log(this.dataarray[i]);
              Swal.fire('oops', 'Check your contact details', 'error')    
              return
            }
          }
     
          // this.fetchseats.number_of_seats = this.flightselected.number_of_seats
          // this.fetchseats.seatclass = this.flightselected.travel_status == true?"business":"economy"
          // let response = await this.fetchseats.fetchseats(this.flightselected.flight_number)
            this.sharedservice.setPassenger(this.dataarray)
            console.log(this.data)
            this.router.navigate([`${'flight/payment'}`,{data:JSON.stringify(this.data),booking_type:this.booking_type,class_type:this.class_type,passengers:JSON.stringify(this.dataarray),totalprice:this.totalprice+708}]);
            //this.TransactionService.passengers = this.dataarray
            this.TransactionService.final_amount = this.totalprice
          
        
        }
  
        // async fetchprice() 
        // {
        //   let response = await this.flightselected.getFlightPrice(this.flightselected.flight_number,this.flightselected.travel_status)
        //   if(response != 'false')
        //     this.seatprice = response
        //   else 
        //     {
        //       Swal.fire('Oops' , 'Error fetching price', 'error')
        //       return
        //     }
        //   let current_date = new Date()
        //   let travel_date = new Date(this.flightselected.travel_date)
        //   let difference_days = (travel_date.getTime() - current_date.getTime())/(1000*3600*24)
        //   difference_days = (Math.round(difference_days))
        //   if(difference_days <= 0) 
        //     this.seatprice = this.seatprice * 2
        //   else 
        //     this.seatprice = (this.seatprice + (this.seatprice/difference_days)).toFixed(0)
        //   this.seatprice = this.seatprice*this.flightselectobj.number_of_seats
        //   this.totalprice = this.seatprice+698+10
        // } 
  }
  