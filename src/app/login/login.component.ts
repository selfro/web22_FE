import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";
import {ToastrService} from "ngx-toastr";


interface Response {
  access_token: string;
}

@Component({
  selector: 'kwm-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  isTutor = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService : AuthenticationService,
    private toastr: ToastrService) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:["", [Validators.required, Validators.email]],
      password:["", Validators.required]
    });
  }

  login(){
    const val = this.loginForm.value;
    if(val.username && val.password){
      this.authService.login(val.username, val.password).subscribe((res:any)=>{
          this.authService.setSessionStorage((res as Response).access_token);
          this.router.navigateByUrl("/");
          if(this.authService.isTutor()) {
            this.toastr.success("Du bist eingeloggt als Tutor!","Login");
          } else {
            this.toastr.success("Du bist eingeloggt als Lernender!","Login");
          }
        }
      )
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
    this.toastr.success("Du wurdest erfolgreich ausgeloggt!","Logout");
  }
}
