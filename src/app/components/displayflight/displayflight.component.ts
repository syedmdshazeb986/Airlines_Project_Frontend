import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Airport } from 'src/app/Models/airport';
import { SearchData } from 'src/app/Models/searchdata';
import { AirportsService } from 'src/app/services/airports.service';
import { SearchflightService } from 'src/app/services/searchflight.service';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-displayflight',
  templateUrl: './displayflight.component.html',
  styleUrls: ['./displayflight.component.css']
})
export class DisplayflightComponent implements OnInit {


  constructor(public service : SearchflightService,private sharedservice:SharedserviceService,private airpServ:AirportsService,private route:ActivatedRoute) { }
  public flights:SearchData[] =[]
  public airports:any[]=[]
  public departure:any;
  public arrival:any;
  public booking_type:any;
  public class_type:any;
  faUser=faUser
  public isLoggedIn: boolean = false
  ngOnInit(): void {
    if(sessionStorage.getItem('user'))
    {
        this.isLoggedIn = true
    }
    this.flights=this.sharedservice.getSearchData();
    console.log(this.flights)
    this.booking_type=this.route.snapshot.paramMap.get('booking_type');
    this.class_type=this.route.snapshot.paramMap.get('class_type');

    console.log(this.flights);
    this.airpServ.getAirports().subscribe((d:Airport[])=> {
    this.airports=d;
    this.departure=this.flights[0].source_city;
    this.arrival=this.flights[0].destination_city;
  });
   
  }
}
