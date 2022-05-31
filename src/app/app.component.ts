import {Component} from '@angular/core';
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'kwm-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isTutor() {
    return this.authService.isTutor();
  }

  getLoginLabel() {
    if (this.isLoggedIn())
      return "Logout";
    else return "Login";
  }

  getCurrentUserId(){
    return this.authService.getCurrentUserId();
  }
}
