import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { User } from "src/app/model/user.model";

@Component({
  selector: "backorads-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"],
})
export class LogInComponent implements OnInit {
  loginForm: any = FormGroup;
  user: User;
  @Output() loginUser: EventEmitter<User>;
  @Input() invalidLogin: boolean = false;
  constructor(private fb: FormBuilder) {
    this.loginUser = new EventEmitter();
    this.loginForm = this.fb.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {}

  loginUserForm(submitForm: FormGroup) {
    if (submitForm.valid) {
      this.user = submitForm.value;
      this.loginUser.emit(this.user);
      this.loginForm.reset();
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
