import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AdminLoginForm } from 'src/app/Models/AdminLoginForm';
import { AdminloginService } from 'src/app/services/adminlogin.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  verify=true;
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
  submitForm(AdminLoginForm: { value: { email: string; }; })
  {
   
    this.timer = true
    this.loginservice.login(AdminLoginForm.value).subscribe((d:any)=>{

      console.log(d);
      if(d == "Login Successful")
      {
        this.router.navigate([`${'/viewallflights'}`]);

        sessionStorage.setItem('admin',AdminLoginForm.value.email)
        console.log(sessionStorage.setItem('admin',AdminLoginForm.value.email))
      }
    },(err: { error: String; })=>{
      this.verify=false;
      this.response = err.error;
      console.log(this.verify);
    })

    setTimeout(() => {
      this.timer = false
    },3000)
  }

}