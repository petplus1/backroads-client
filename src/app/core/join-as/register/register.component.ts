import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { User } from "src/app/model/user.model";

@Component({
  selector: "backorads-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: any = FormGroup;
  @Output() newUser: EventEmitter<User>;
  @Input() succesReg: boolean = false;
  constructor(private fb: FormBuilder) {
    this.newUser = new EventEmitter();

    this.registerForm = this.fb.group({
      name: new FormControl("", [
        Validators.required,
        Validators.compose([
          Validators.pattern("[a-zA-z ]*"),
          Validators.minLength(3),
        ]),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      username: new FormControl("", [
        Validators.required,
        Validators.compose([
          Validators.pattern("[a-zA-z ]*[0-9+ ]*"),
          Validators.minLength(3),
        ]),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.compose([
          Validators.pattern("[a-zA-z ]*[0-9+ ]*"),
          Validators.minLength(8),
        ]),
      ]),
    });
  }

  ngOnInit() {}

  saveForm(submitForm: FormGroup) {
    if (submitForm.valid) {
      this.user = submitForm.value;
      this.user.creationDate = new Date();
      this.newUser.emit(this.user);
      this.registerForm.reset();
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
