import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Airport } from 'src/app/Models/airport';
import { SearchData } from 'src/app/Models/searchdata';
import { Searchflight } from 'src/app/Models/searchflight';
import { AirportsService } from 'src/app/services/airports.service';
import { SearchflightService } from 'src/app/services/searchflight.service';
import { SharedserviceService } from 'src/app/sharedservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private service : AirportsService,private sharedservice:SharedserviceService, private GetFlightsService:SearchflightService,private router: Router) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.minDate = new Date(currentYear,currentMonth,currentDate)
    this.maxDate = new Date(currentYear,currentMonth+2,currentDate)
  }
  public loggedIn : boolean = false
  faUser = faUser
  public airports: Airport[] = []
  public travellers:number[] = [0,1,2,3,4,5,6,7,8,9]
  public departurecity:string 
  public arrivalcity:string
  minDate: Date;
  maxDate: Date;
  pageName = 'flight/search'
  model:Searchflight;

  ngOnInit(): void {
    if(sessionStorage.getItem('userid'))
    {
      this.loggedIn = true
    }
    
  this.service.getAirports().subscribe(d=>{
      this.airports=d;
      this.model = new Searchflight("one_way",this.airports[0].airportId, this.airports[1].airportId, new Date("2022-09-26T00:00:00"),new Date("2022-09-26T00:00:00"), 0,0,0,"business");

    },er=>{
      console.log(er.error);
    })

  }

  
  
  
  handlelogout() 
  {
    sessionStorage.removeItem('userid')
    this.loggedIn=false
    this.router.navigate([`${'/'}`]);
  }
  onSubmit()
  {
    Swal.fire('Fetching Your Flights');    
    Swal.showLoading();

  
    
      this.GetFlightsService.SearchFlights(this.model.Booking_Type,this.model.Depart_airport_Id,this.model.Arrival_airport_Id,this.model.Departure_Time,this.model.Arrival_Time,this.model.adults,this.model.childs,this.model.infants,this.model.Class_Type).subscribe((d:SearchData[])=>{
       console.log(this.model)
       console.log(d)
       this.sharedservice.setSearchData(d)
       this.sharedservice.setuserid(Number(sessionStorage.getItem('userid')))
       this.sharedservice.setSearchquery(this.model)
        Swal.close();
        this.router.navigate([`${this.pageName}`,{flights:JSON.stringify(d),source:this.model.Depart_airport_Id,destination:this.model.Depart_airport_Id,booking_type:this.model.Booking_Type,class_type:this.model.Class_Type}]);
      });
        
  
      // this.GetFlightsService.flightdata;

      // },err=>{
      //   Swal.close()
      //   Swal.fire('Internal Server Error', 'Try again later' , 'error')
      // });
    
    
     



  }

}
