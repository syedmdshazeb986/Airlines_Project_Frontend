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

  constructor(private sharedservice:SharedserviceService,private seatService : FetchseatsService, public TransactionService:TransactionService, public router: Router,public route:ActivatedRoute) {   }
  public row1:any=[];
  public row2:any=[];
  public row3:any=[];
  public row4:any=[];
  public row5:any=[];
  public row6:any=[];
  
  public flightdetails:any;
  public passengers:any;
  public seatarray:Seat[];
  public n =10
  public k=0;
  public numberofseats:number
  public seatclass:string
  public reservedSeatsArray:any = []
  public booking_type:any;
  public class_type:any;

  ngOnInit(): void {
    if(!sessionStorage.getItem('userid'))
    {
      Swal.fire({
        title: 'Oops!',
        text: 'Login to Continue!',
        icon: 'warning',
       
      })
      this.router.navigate([`${'/userlogin'}`]);
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    const date =`${currentYear}-${currentMonth+1}-${currentDate}`
    this.flightdetails=this.sharedservice.getAeroplaneCardData()
    this.passengers=this.sharedservice.getPassengers()
    this.booking_type=this.route.snapshot.paramMap.get('booking_type');
    this.class_type=this.route.snapshot.paramMap.get('class_type');
    console.log(this.flightdetails,this.passengers,this.booking_type,this.class_type);

    this.seatService.getSeatsByFlightId(1).subscribe(d=>{
      this.seatarray=d.filter(s=>s.seatType==this.class_type);
    this.numberofseats = this.seatarray.length
    this.setbooked()
    console.log(this.seatarray)
    })
    this.seatclass = this.class_type;

  }

  setbooked = () => 
  {
     this.seatarray = this.seatService.getseats();

     for(let j=0;j<this.n;j++)
     {
       this.row1[j]=this.seatarray[j];
     }
    for(let j=0;j<this.n;j++)
    {
      this.row2[j]=this.seatarray[this.k];
      this.row2[j].reserved=0;
      this.k++;
    }
    for(let j=0;j<this.n;j++)
    {
      this.row3[j]=this.seatarray[this.k];
      this.row3[j].reserved=0;
      this.k++;
    }
    console.log(this.row2,this.row3);
    // for(let j=0;j<this.n;j++)
    // {
    //   this.row4[j]=this.seatarray[this.k];
    //   this.row4[j].reserved=0;
    //   this.k++;
    // }
    // for(let j=0;j<this.n;j++)
    // {
    //   this.row5[j]=this.seatarray[this.k];
    //   this.row5[j].reserved=0;
    //   this.k++;
    // }
    // for(let j=0;j<this.n;j++)
    // {
    //   this.row6[j]=this.seatarray[this.k];
    //   this.row6[j].reserved=0;
    //   this.k++;
    // }
  }

  


  reserve = (seatnumber:any) =>
  {

//if alerady reserved
      if(this.reservedSeatsArray.includes(seatnumber))
      {
        this.row2.map((i:any)=>{
          if(i.SeatId==seatnumber){
            i.reserved=0;
          }
        });
        this.row3.map((i:any)=>{
          if(i.SeatId==seatnumber){
            i.reserved=0;
          }
        });
        this.row4.map((i:any)=>{
          if(i.SeatId==seatnumber){
            i.reserved=0;
          }
        });
        this.row5.map((i:any)=>{
          if(i.SeatId==seatnumber){
            i.reserved=0;
          }
        });
        this.row6.map((i:any)=>{
          if(i.SeatId==seatnumber){
            i.reserved=0;
          }
        });
          this.reservedSeatsArray = this.reservedSeatsArray.filter((x:any) => x!= seatnumber)
          // this.seatarray.map(x => {
          //   if(x.seat_id == seatnumber)
          //     x.is_booked = true;
          // })
          return
      }
      //place left
      else if(this.reservedSeatsArray.length < this.passengers.length)
      {
        this.reservedSeatsArray.push(seatnumber)
        this.row2.map((i:any)=>{
          if(i.seat_id==seatnumber){
            i.reserved=1;
          }
        });
        this.row3.map((i:any)=>{
          if(i.SeatId==seatnumber){
            i.reserved=1;
          }
        });
        this.row4.map((i:any)=>{
          if(i.SeatId==seatnumber){
            i.reserved=1;
          }
        });
        this.row5.map((i:any)=>{
          if(i.SeatId==seatnumber){
            i.reserved=1;
          }
        });
        this.row6.map((i:any)=>{
          if(i.SeatId==seatnumber){
            i.reserved=1;
          }
        });
      }
       //no place left
      else 
      {
        // let deselected = this.reservedSeatsArray.shift()
        // this.seatarray.map(x => {
        //   if(x.seatnumber == deselected)
        //     x.reserved = 0
        // })
        // this.reservedSeatsArray.push(seatnumber)
        // this.seatarray.map(x => {
        //   if(x.seatnumber == seatnumber)
        //     x.reserved = 1
        // })
      }
      console.log(this.reservedSeatsArray);
  } 

  onSubmit()
  {
 
    // if(!this.email || !this.mobile)
    // {
    //     Swal.fire('oops', 'Enter contact details', 'error')    
    //     return
    // }
    // var emailregex =  new RegExp ("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    // var phoneregex = new RegExp("^[0-9]{10}$")
    // if(!emailregex.test(this.email) || !phoneregex.test(this.mobile))
    // {
    //   Swal.fire('oops', 'Check your contact details', 'error')    

    // }
  
      if(this.reservedSeatsArray.length == this.passengers.length)
        {
          for(let i=0;i<this.passengers.length;i++){
            this.passengers[i].name=this.passengers[i].firstname+" "+this.passengers[i].lastname
            delete this.passengers[i]['firstname'];
            delete this.passengers[i]['lastname'];
            this.passengers[i].seat_id=this.reservedSeatsArray[i];
          }
          this.TransactionService.seatArray = this.reservedSeatsArray
          this.router.navigate([`${'flight/payment'}`,{passengers:JSON.stringify(this.passengers),booking_type:this.booking_type,class_type:this.class_type,flight:JSON.stringify(this.flightdetails)}]);
        }
        else 
        Swal.fire('oops', 'Select all seats', 'error')
  }
}
