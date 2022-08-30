import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchflightService } from 'src/app/services/searchflight.service';
import { SelectedflightService } from 'src/app/services/selectedflight.service';
import { SharedserviceService } from 'src/app/sharedservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-airplanecard',
  templateUrl: './airplanecard.component.html',
  styleUrls: ['./airplanecard.component.css']
})
export class AirplanecardComponent implements OnInit {

  @Input() flightdetails:any;
  @Input() booking_type:String;
  @Input() class_type:String;
  constructor(public service : SearchflightService, private sharedservice:SharedserviceService,public flightselected:SelectedflightService, public router : Router ) { }
  public date:Date
  public color = 'green'
  
  ngOnInit(): void {
    this.date = this.service.date
  }

  checktime(departure_time:any)
  { 
    if(new Date(this.date).getDate() == new Date().getDate() )
    {
      if( parseInt(departure_time.substring(0,2)) - new Date().getHours() > 3)
        return true;
      else
        return false;
    }
    else 
      return true;
  }

  calculate_price(price:any)
  {
    let current_date = new Date()
    let travel_date = new Date(this.date)
    // let difference_time = travel_date.getTime() - current_date.getTime()
    let difference_days = (travel_date.getTime() - current_date.getTime())/(1000*3600*24)
    difference_days = (Math.round(difference_days))
    if(difference_days <= 0)
      return price * 2; 
    else 
    return (price + price/difference_days).toFixed(0)

  }
  onBookNow(a:any)
  {
    if(sessionStorage.getItem('userid'))
    {
      // await this.flightselected.postdata(
      //   {
      //     "":this.flightdetails.
      //     "departure_location":departure,
      //     "arrival_location":arrival,
    //     "flight_number":flight_number,
      //     "travel_date":this.date,
      //     "number_of_seats":this.seats,
      //     "classstate":this.classstate
      //   })
      this.sharedservice.setAeroplaneCardData(a);
        this.router.navigate([`${'flight/passengers'}`,{data:JSON.stringify(a),booking_type:this.booking_type,class_type:this.class_type}]);
    }
    else {
      Swal.fire({
        icon:'warning',
        title: 'Oops!',
        text: 'Login to continue',
        showCancelButton: true,
        confirmButtonColor: '#049F0C',
        cancelButtonColor:'#ff0000',
        confirmButtonText: 'Take me to login',
        cancelButtonText: 'Maybe Later'
      }).then(async(result) => {
        if(result.value)
        {
          this.router.navigate([`${'userlogin'}`]);
        }
      })
    }
  }
}
