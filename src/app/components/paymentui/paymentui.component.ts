import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { SharedserviceService } from 'src/app/sharedservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paymentui',
  templateUrl: './paymentui.component.html',
  styleUrls: ['./paymentui.component.css']
})
export class PaymentuiComponent implements OnInit {

  constructor(private sharedservice:SharedserviceService,private router:Router, private TransactionService:TransactionService,private service:LoginserviceService,private route:ActivatedRoute) { }
  public payment:any;
  public passengers:any;
  public flightdetails:any;
  public booking_type:any;
  public class_type:any;
  public user_id:any;
  public model:any;



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
    this.payment={
      name:'',
      cardnumber:null,
      expmonth:null,
      expyear:null,
      cvv:null
    }
    this.model=this.sharedservice.getSearchquery();
    this.passengers=this.sharedservice.getPassengers();
    this.flightdetails=this.sharedservice.getAeroplaneCardData();
    this.booking_type=this.model.Booking_Type
    this.class_type=this.model.Class_Type
    this.user_id=this.sharedservice.getuserid();
    console.log(this.flightdetails)
    console.log(this.passengers)
    console.log(this.user_id)
    console.log(this.booking_type)
    console.log(this.class_type)
    
  }

  submitForm(paymentForm:any)
  {
      console.log(this.passengers)
      this.TransactionService.book(this.user_id,this.flightdetails.flightId,this.booking_type,this.flightdetails.arrival_Time,this.class_type,this.flightdetails.departure_Time,'credit_card',this.passengers).subscribe(d=>{
        if(d=="Flight Booked Successfully"){
        Swal.fire(
          'Woohoo',
          'Your Tickets are booked :)',
          'success'
        )
        this.router.navigate([`${'eticket'}`]);
        }
      },err=>{
        
          Swal.fire(
            `Transaction Failed (${err.error})`,
            'Try again later :(',
            'error'
          )
      })

  }
}