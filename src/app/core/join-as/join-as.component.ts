import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { User } from "src/app/model/user.model";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { LoginAuthService } from "src/app/service/login-auth.service";
import { fromEvent, Subscription } from "rxjs";

@Component({
  selector: "backroads-join-as",
  templateUrl: "./join-as.component.html",
  styleUrls: ["./join-as.component.css"],
})
export class JoinAsComponent implements OnInit {
  register: boolean = true;
  succesLogIn: boolean;
  sucReg: boolean;
  userStatus: boolean;

  @ViewChild("regElem") registationElemRef: ElementRef;
  @ViewChild("logElem") loginElemRef: ElementRef;

  clickedElement: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: LoginAuthService
  ) {
    this.authService.getSutatus().subscribe((res) => {
      this.userStatus = res;
    });
    this.authService.isLoggedIn();
    if (this.userStatus) {
      this.router.navigate(["/home"]);
    }
  }

  ngOnInit() {}
  ngAfterViewInit() {
    this.onLoadActivate();
    this.clickedElement = fromEvent(
      this.registationElemRef.nativeElement,
      "click"
    ).subscribe(() => {
      this.loginElemRef.nativeElement.classList.remove("active");
      this.registationElemRef.nativeElement.classList.add("active");
      this.register = true;
    });
    this.clickedElement = fromEvent(
      this.loginElemRef.nativeElement,
      "click"
    ).subscribe(() => {
      this.registationElemRef.nativeElement.classList.remove("active");
      this.loginElemRef.nativeElement.classList.add("active");
      this.register = false;
    });
  }
  ngOnDestroy() {
    this.clickedElement.unsubscribe();
  }
  onLoadActivate() {
    this.registationElemRef.nativeElement.classList.add("active");
  }
  logIn(user: User) {
    this.userService.loginUser(user).subscribe(
      (response) => {
        if (response) {
          if (response.token) {
            localStorage.setItem("currentUser", JSON.stringify(response));
            for (let i = 0; response.user.userAuthority.length > i; i++) {
              let userAuth: any = response.user.userAuthority[i];
              if (userAuth.authority === "ROLE_ADMIN") {
                this.router.navigate(["/admindashboard"]);
              } else {
                this.router.navigate(["/home"]);
              }
            }
          }
        }
        this.succesLogIn = false;
      },
      (error) => {
        this.succesLogIn = true;
      }
    );
  }
  saveUser(user: User) {
    this.userService.register(user).subscribe((res) => {
      this.sucReg = true;
    });
  }
}
