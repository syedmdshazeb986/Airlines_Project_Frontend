import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminflightcrudService } from 'src/app/services/adminflightcrud.service';
import { AirportsService } from 'src/app/services/airports.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewallflights',
  templateUrl: './viewallflights.component.html',
  styleUrls: ['./viewallflights.component.css']
})
export class ViewallflightsComponent implements OnInit {

  airports:any;
  flights: any;
  isLoggedIn: boolean;
  searchText: any;
  

  constructor(private service: AdminflightcrudService, private as: AirportsService, private routers:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    //this.airports=JSON.parse(this.route.snapshot.paramMap.get('airports'));
    this.as.getAirports().subscribe(data=>{this.airports=data;
      console.log(this.airports)
    });
    this.service.getAll().subscribe((data)=>{
      this.flights = data;
      console.log(this.flights);
      this.flights=this.flights.sort();
      })

    /*if(!this.service.refreshcheck){
      window.location.reload();
      this.service.refreshcheck=true;
    }*/

  
    if(!sessionStorage.getItem('admin')){
      Swal.fire({
        title:'Oops!',
        text:'Login to continue!',
        icon:'warning',
      })
      this.routers.navigate([`${'/adminlogin'}`])
    }

    if(sessionStorage.getItem('admin'))
    {
        this.isLoggedIn = true
    }
    
  }

  delete(flightname: string){

    Swal.fire({
      title:'Are you sure?',
      text:'You can\'t recover the flight details once deleted!',
      icon:'error',

      cancelButtonColor: "#00FF00",
      confirmButtonColor: "#DD6B55",
      showCancelButton:true,
      confirmButtonText:'Yes, delete!',
      cancelButtonText: 'No, keep it'
    }).then((result)=>{
      if(result.value){
        Swal.fire('Deleting Flight!');    
        Swal.showLoading();
        this.service.deleteflight(flightname).subscribe();
        Swal.close();
        window.location.reload()
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Flight deleted successfully!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }

}

