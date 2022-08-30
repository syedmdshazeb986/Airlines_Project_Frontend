import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UsersignupComponent } from './components/usersignup/usersignup.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { FlightdataComponent } from './components/dashboard/flightdata/flightdata.component';
import { CancellationsComponent } from './components/dashboard/cancellations/cancellations.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { PassengersComponent } from './components/passengers/passengers.component';
import { SearchComponent } from './components/search/search.component';
import { AdminheaderComponent } from './components/adminheader/adminheader.component';
import { HeaderComponent } from './components/header/header.component';
import { LoggedinheaderComponent } from './components/loggedinheader/loggedinheader.component';
import { RulesComponent } from './components/rules/rules.component';
import { AdminloggedinheaderComponent } from './components/adminloggedinheader/adminloggedinheader.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { DisplayflightComponent } from './components/displayflight/displayflight.component';
import { AirplanecardComponent } from './components/airplanecard/airplanecard.component';
import { SeatuiComponent } from './components/seatui/seatui.component';
import { PaymentuiComponent } from './components/paymentui/paymentui.component';
import { EticketComponent } from './components/eticket/eticket.component';







@NgModule({
  declarations: [
    AppComponent,
    UsersignupComponent,
    UserloginComponent,
    FlightdataComponent,
    CancellationsComponent,
    SidebarComponent,
    PassengersComponent,
    SearchComponent,
    AdminheaderComponent,
    HeaderComponent,
    LoggedinheaderComponent,
    RulesComponent,
    AdminloggedinheaderComponent,
    AdminloginComponent,
    DisplayflightComponent,
    AirplanecardComponent,
    SeatuiComponent,
    PaymentuiComponent,
    EticketComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,  
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent,UsersignupComponent,UserloginComponent,SearchComponent,AdminloginComponent]
})
export class AppModule { }
