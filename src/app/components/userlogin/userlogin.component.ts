import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm,FormsModule} from '@angular/forms';
import { userlogin } from 'src/app/Models/userlogin';
import { UserloginService } from 'src/app/services/userlogin.service';
import { usersignup } from 'src/app/Models/usersignup';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  constructor(private _service:UserloginService,private router:Router,private active:ActivatedRoute) { }
  data:userlogin;
  logInUser:any;
  ngOnInit(): void {
  }
  
  onSubmit(myform:NgForm) {
    this.data=myform.value;
    console.log(this.data)
    this._service.Login(this.data).subscribe((res) =>
      {
        if (res) {
          alert("Login success");
          this.logInUser=res;
          console.log(this.logInUser);
          sessionStorage.setItem("email",this.logInUser.email);
          sessionStorage.setItem("userid",JSON.stringify(this.logInUser.userId));
          console.log(sessionStorage.getItem("email"));
          console.log(sessionStorage.getItem("userid"));
        }

      }, (err) => {
        alert("There was a problem logging you out");
      });

  }

}
