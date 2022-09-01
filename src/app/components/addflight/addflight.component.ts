import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adminflight } from 'src/app/Models/adminflight';
import { Airport } from 'src/app/Models/airport';
import { AdminflightcrudService } from 'src/app/services/adminflightcrud.service';
import { AirportsService } from 'src/app/services/airports.service';
import { FormsModule ,NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addflight',
  templateUrl: './addflight.component.html',
  styleUrls: ['./addflight.component.css']
})
export class AddflightComponent implements OnInit {

  airports: Airport[]=[];
  flights:any;
  clicked:boolean=false;
  addflight : Adminflight;
  isLoggedIn: boolean;
  
  constructor(private _service:AdminflightcrudService, private airportservice: AirportsService, private route:Router) { }

  changeairport(e:any){
    console.log(e.target.value);
  }
  ngOnInit(): void {
    this.airportservice.getAirports().subscribe((data)=>{this.airports =data});
    this._service.getAll().subscribe((data:Adminflight[])=>{
      this.flights=data;
      console.log(this.airports);
      console.log(this.flights);

    })
    if(!sessionStorage.getItem('admin'))
    {
      Swal.fire({
        title: 'Oops!',
        text: 'Login to Continue!',
        icon: 'warning',
       
      })
      this.route.navigate([`${'/adminlogin'}`]);
    }
    if(sessionStorage.getItem('admin'))
    {
        this.isLoggedIn = true
    }
   
  }

  onSubmit(myform:any){
    this.addflight = myform;
    this.addflight.depart_airport_id=Number(myform.depart_airport_id);
    this.addflight.arrival_airport_id=Number(myform.arrival_airport_id);
    console.log(this.addflight);
    this._service.addflight(this.addflight).subscribe((res)=>{
      if (res) {
        console.log(res);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Flight added successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigateByUrl("viewallflights");
      }
    }, (err) => {
      //alert("Try again!");
      Swal.fire('Try again!')
    });
  
    
  }

  make(){
    this.clicked=!this.clicked;
  }

  
 

}