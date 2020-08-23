import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user.model";
import { LoginAuthService } from "src/app/service/login-auth.service";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { LoggedUser } from "src/app/model/loggedUser.model";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"],
})
export class UserInfoComponent implements OnInit {
  userStatus: boolean;
  isAdmin: boolean;
  succesChange: boolean = false;

  newNameForm: any = FormGroup;

  logedUser: User;

  constructor(
    private router: Router,
    private authService: LoginAuthService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
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

    if (!this.userStatus) {
      this.router.navigate(["/home"]);
    }
    this.newNameForm = this.fb.group({
      name: new FormControl("", [
        Validators.compose([
          Validators.pattern("[a-zA-z ]*"),
          Validators.minLength(3),
        ]),
      ]),
    });
  }

  ngOnInit() {}

  newName(submitForm: FormGroup) {
    if (submitForm.valid) {
      let u = new LoggedUser(JSON.parse(localStorage.getItem("currentUser")));
      u.user.name = submitForm.value.name;
      localStorage.removeItem("currentUser");
      localStorage.setItem("currentUser", JSON.stringify(u));

      this.userService.newName(u.token, new User(u.user)).subscribe(
        (res) => {
          this.succesChange = true;
          this.logedUser.name = u.user.name;
        },
        (error) => {
          this.succesChange = false;
        }
      );
      this.newNameForm.reset();
    } else {
      this.validateFormFields(submitForm);
    }
  }
  validateFormFields(submitForm: FormGroup) {
    Object.keys(submitForm.controls).forEach((field) => {
      const control = submitForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateFormFields(control);
      }
    });
  }
}
