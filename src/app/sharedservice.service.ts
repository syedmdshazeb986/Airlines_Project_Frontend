import { Injectable } from '@angular/core';
import { Airport } from './Models/airport';
import { Passenger } from './Models/passenger';
import { SearchData } from './Models/searchdata';
import { Searchflight } from './Models/searchflight';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
flight:any
airports:Airport[]
passengers:Passenger[]
selectedairplane:any
userId:any
amount:any
booking_type:any
no_of_passengers:any
searchquery:Searchflight
  constructor() { }



  setSearchData(data:any){
    this.flight=data;
  }
  getSearchData(){
    return this.flight
  }
  setSearchAirports(data:any){
    this.airports=data;
  }
  getSearchAirports(){
    return this.airports
  }
  setAeroplaneCardData(a:any){
    this.selectedairplane=a;
  }
    
  getAeroplaneCardData(){
  return this.selectedairplane
  }
setPassenger(data:Passenger[]){
  this.passengers=data;
} 

getPassengers(){
  return this.passengers
}

setuserid(userid:any){
  this.userId=userid
}

getuserid(){
  return this.userId
}
setSearchquery(model:any){
this.searchquery=model
}
getSearchquery(){
  return this.searchquery
}

setAmount(total_amount:any){
  this.amount=total_amount
}

getAmount(){
  return this.amount
}

}
