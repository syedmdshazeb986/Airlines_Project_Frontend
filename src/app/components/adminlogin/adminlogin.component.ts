import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AdminLoginFormat } from 'src/app/Models/AdminLoginFormat';
import { AdminloginService } from 'src/app/services/adminlogin.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  verify=true;
  data:AdminLoginFormat
  yes: any;
  public adminlogin: { email: string; password: string; };;
  public response: String
  public timer : Boolean
  constructor(private loginservice:AdminloginService, private router: Router) { }
  faEyeSlash = faEyeSlash;
  faEye=faEye;
  visible = false;

  ngOnInit(): void {
    this.adminlogin={
      email:'',
      password:''
    };
  }
  clickoninput()
  {
    this.verify=true;
  }
  onClick()
  {
    this.visible = !this.visible;
  }
  submitForm(myform:NgForm)
  {
    this.data=myform.value;
    console.log(this.data)
    this.timer = true
    this.loginservice.login(myform.value).subscribe((res)=>{

      if (res) {
        alert("Login success");
        console.log(res);
        //sessionStorage.setItem("email",this.res.email);
        //sessionStorage.setItem("userid",JSON.stringify(this.logInUser.userId));
        //console.log(sessionStorage.getItem("email"));
        //console.log(sessionStorage.getItem("userid"));
      }

    }, (err) => {
      alert("There was a problem logging you out");
    });

    setTimeout(() => {
      this.timer = false
    },3000)
  }
}
