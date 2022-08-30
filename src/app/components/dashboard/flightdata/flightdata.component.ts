import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flightdata } from 'src/app/Models/flightdata';
import { BookinghistoryService } from 'src/app/services/bookinghistory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flightdata',
  templateUrl: './flightdata.component.html',
  styleUrls: ['./flightdata.component.css']
})
export class FlightdataComponent implements OnInit {
  userId:number
  constructor(private bookinghistoryservice : BookinghistoryService,private router:Router) { }
  bookedtickets:Flightdata[]=[];
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
this.userId=Number(sessionStorage.getItem('user'))
this.bookinghistoryservice.getbookeddata(this.userId).subscribe(data=>{
  this.bookedtickets = data;
  console.log(this.bookedtickets)
});


}

oncancel(id:any)   {
  console.log(id)
  let current_date = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
  Swal.fire({
    icon:'warning',
    title: 'Are you sure to cancel this ticket?',
    text: 'You will not be able to revert this ',
    showCancelButton: true,
    confirmButtonColor: '#049F0C',
    cancelButtonColor:'#ff0000',
    confirmButtonText: 'Yes, cancel it!',
    cancelButtonText: 'Keep my reservation'
  }).then(async(result) => {
    console.log(result)
    if(result.value)
    {
      this.bookinghistoryservice.cancelticket(id).subscribe(data=>{
        if(data){
          Swal.fire(
            'Woohoo',
            'Your Travel is still on :)',
            'success'

          )

        }
      })
      //this.userId=sessionStorage.getItem('user')
      this.bookinghistoryservice.getbookeddata(2).subscribe(data=>{
        this.bookedtickets=data;
        console.log(data);
        window.location.reload();
      })

      
    }
    
    else if(result.dismiss === Swal.DismissReason.cancel) 
      {
        Swal.fire(
          'Oops',
          'Your Ticket was not deleted ! try again later :)',
          'error'
        )
      }
  })  
}

}