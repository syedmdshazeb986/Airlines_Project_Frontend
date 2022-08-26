import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm,FormsModule} from '@angular/forms';
import { userlogin } from 'src/app/Models/userlogin';
import { UserloginService } from 'src/app/services/userlogin.service';

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
          this.logInUser=this.data;
          console.log(res);
          sessionStorage.setItem("username",this.logInUser.email);

        }

      }, (err) => {
        alert("There was a problem logging you out");
      });

  }

}
