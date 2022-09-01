import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { CancellationsComponent } from './components/dashboard/cancellations/cancellations.component';
import { FlightdataComponent } from './components/dashboard/flightdata/flightdata.component';
import { DisplayflightComponent } from './components/displayflight/displayflight.component';
import { PassengersComponent } from './components/passengers/passengers.component';
import { RulesComponent } from './components/rules/rules.component';
import { SearchComponent } from './components/search/search.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { UsersignupComponent } from './components/usersignup/usersignup.component';
import { SeatuiComponent } from './components/seatui/seatui.component';
import { PaymentuiComponent } from './components/paymentui/paymentui.component';
import { EticketComponent } from './components/eticket/eticket.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ViewallflightsComponent } from './components/viewallflights/viewallflights.component';
import { AddflightComponent } from './components/addflight/addflight.component';


const routes: Routes = [
  { path: 'usersignup', component:UsersignupComponent },
  { path:'userlogin',component:UserloginComponent },
  { path:'flightdata',component:FlightdataComponent },
  {path:'cancelleddata',component:CancellationsComponent},
  {path:'adminlogin',component:AdminloginComponent},
  {path:'flight/rules',component:RulesComponent},
  {path:'',component:SearchComponent},
  {path:'flight/search',component:DisplayflightComponent},
  {path:'flight/passengers',component:PassengersComponent},
  {path:'flight/seats',component:SeatuiComponent},
  {path:'flight/payment',component:PaymentuiComponent},
  {path:'eticket',component:EticketComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'addflight',component:AddflightComponent},
  {path:'viewallflights',component:ViewallflightsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
