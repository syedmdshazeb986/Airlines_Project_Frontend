import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-loggedinheader',
  templateUrl: './loggedinheader.component.html',
  styleUrls: ['./loggedinheader.component.css']
})
export class LoggedinheaderComponent implements OnInit {

  constructor(private router: Router,private service:LoginserviceService) { }
  faUser = faUser
  user:any;
  wallet:any=0;

  ngOnInit(): void {
    if(sessionStorage.getItem('userid')){
    this.service.getUserData(sessionStorage.getItem('userid')).subscribe(d=>{
      this.user=d;
    })
    this.service.getWalletDetails(sessionStorage.getItem('userid')).subscribe(d=>{
      this.wallet=d;
      console.log(d);

    });
    }
  }
  handlelogout = () => 
  {
    sessionStorage.removeItem('userid')
    this.router.navigate([`${'/userlogin'}`]);
  }
}
