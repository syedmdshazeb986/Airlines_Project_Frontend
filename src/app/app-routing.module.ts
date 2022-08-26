import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { UsersignupComponent } from './components/usersignup/usersignup.component';


const routes: Routes = [
  { path: 'usersignup', component:UsersignupComponent },
  { path:'userlogin',component:UserloginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
