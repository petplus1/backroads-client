import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { User } from "../model/user.model";
import { LoggedUser } from "../model/loggedUser.model";

@Injectable({
  providedIn: "root",
})
export class LoginAuthService {
  private isLogged = new Subject<boolean>();
  private isAdmin = new Subject<boolean>();
  private user = new Subject<User>();
  private token = new Subject<any>();
  private loggedUser: LoggedUser;
  isLoggedIn() {
    if (localStorage.getItem("currentUser")) {
      this.loggedUser = new LoggedUser(
        JSON.parse(localStorage.getItem("currentUser"))
      );
      this.isLogged.next(true);
      this.user.next(new User(this.loggedUser.user));
      this.token.next(this.loggedUser.token);
      for (let i = 0; this.loggedUser.user.userAuthority.length > i; i++) {
        let userAuth: any = this.loggedUser.user.userAuthority[i];
        if (userAuth.authority === "ROLE_ADMIN") {
          this.isAdmin.next(true);
        } else {
          this.isAdmin.next(false);
        }
      }
    } else {
      this.isLogged.next(false);
    }
  }
  clearStatus() {
    this.isLogged.next();
    this.isAdmin.next();
    this.user.next();
  }
  getSutatus(): Observable<boolean> {
    return this.isLogged.asObservable();
  }
  getToken(): Observable<any> {
    return this.token.asObservable();
  }
  getAdminSutatus(): Observable<boolean> {
    return this.isAdmin.asObservable();
  }
  getUser(): Observable<User> {
    return this.user.asObservable();
  }
  constructor() {}
}
