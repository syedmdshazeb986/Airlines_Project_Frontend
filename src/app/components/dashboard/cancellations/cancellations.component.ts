import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flightdata } from 'src/app/Models/flightdata';
import { BookinghistoryService } from 'src/app/services/bookinghistory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancellations',
  templateUrl: './cancellations.component.html',
  styleUrls: ['./cancellations.component.css']
})
export class CancellationsComponent implements OnInit {

  constructor(private bookinghistoryservice : BookinghistoryService,public router:Router) { }
  public cancelledtickets:Flightdata[] = []
  ngOnInit() {
    if(!sessionStorage.getItem('userid'))
    {
      Swal.fire({
        title: 'Oops!',
        text: 'Login to Continue!',
        icon: 'warning',
       
      })
      this.router.navigate([`${'/userlogin'}`]);
    }
    this.bookinghistoryservice.getcancelledbookings(2).subscribe((d:any)=>{
      this.cancelledtickets = d;
      console.log(this.cancelledtickets)
    })
  }
}
