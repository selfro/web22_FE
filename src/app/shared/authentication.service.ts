import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import jwtDecode from "jwt-decode";

interface Token {
  exp: number,
  user: {
    id: string,
    isTutor: string,
    firstName: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api: string = "http://kwm.s1910456010.student.kwmhgb.at/api/auth";

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public setSessionStorage(token: string) {
    const decodedToken = jwtDecode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
    sessionStorage.setItem("isTutor", decodedToken.user.isTutor);
    sessionStorage.setItem("firstName", decodedToken.user.firstName);
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("isTutor");
    sessionStorage.removeItem("firstName");
  }

  public isLoggedIn() {
    if (sessionStorage.getItem("token")) {
      let token: string = <string>sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCDate(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.info("token expired");
        sessionStorage.removeItem("token");
        return false;
      } else return true;
    }
    return false;
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  public isTutor() {
    return sessionStorage.getItem("isTutor") === "1";
  }

  getCurrentUserName() {
    return sessionStorage["firstName"];
  }
}
