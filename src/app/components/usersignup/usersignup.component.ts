import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { usersignup } from 'src/app/Models/usersignup';
import { UsersignupService } from 'src/app/services/usersignup.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css']
})
export class UsersignupComponent implements OnInit {

  constructor(private _service :UsersignupService, private activeroute:ActivatedRoute,private router:Router) { }
  faEyeSlash = faEyeSlash;
  faEye=faEye;
  //password toggle
  visible = false;
  confirmpassword:any;
  register=new AppModule();
  public response:string ;
  public timer : boolean;
  newuser:usersignup;
  ngOnInit(): void {
  }
  onClick()
  {
    this.visible = !this.visible;
  }
  onSubmit(myform:NgForm)
  {
    delete myform.value.confirmpassword;
    this.newuser=myform.value;
    this._service.RegisterUser(this.newuser).subscribe(data=>
      console.log(this.newuser)
      )

  }
}