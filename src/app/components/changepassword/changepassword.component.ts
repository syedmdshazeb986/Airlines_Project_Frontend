import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ChangepasswordService } from 'src/app/services/changepassword.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  faEyeSlash = faEyeSlash;
  faEye=faEye;
  changep:any;
  
  constructor(private service:ChangepasswordService,private route:Router) { }
  visible = false;
  ngOnInit(): void {
  }

  onClick()
  {
    this.visible = !this.visible;
  }

  onSubmit(myform:any)
  {
    this.changep=myform;
    console.log(this.changep);
    this.service.Reset(this.changep).subscribe((res)=>{
      if(res)
      {
        Swal.fire('Done', 'Password changed successfully', 'success')
        this.route.navigate([`${'/userlogin'}`]);
      }
      else{
        Swal.fire('Error', 'Try again', 'error')
      }
    })
  }
}
