import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { LoginAuthService } from "src/app/service/login-auth.service";
import { User } from "src/app/model/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "backroads-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit, OnChanges {
  @ViewChild("navLinks") links: ElementRef;
  @ViewChild("userInfo") toggleUserInfo: ElementRef;

  userStatus: boolean;
  isAdmin: boolean;
  logedUser: User;

  constructor(private router: Router, private authService: LoginAuthService) {
    this.authService.getSutatus().subscribe((res) => {
      this.userStatus = res;
    });
    this.authService.getUser().subscribe((res) => {
      this.logedUser = res;
    });
    this.authService.getAdminSutatus().subscribe((res) => {
      this.isAdmin = res;
    });
    this.authService.isLoggedIn();
  }
  ngOnChanges() {}
  ngOnInit() {}
  toggle() {
    this.links.nativeElement.classList.toggle("show-links");
  }
  showUserInfo() {
    this.toggleUserInfo.nativeElement.classList.toggle("show-clip");
  }
  logOut() {
    localStorage.removeItem("currentUser");
    this.router.navigate(["/join_as"]);
  }
}
