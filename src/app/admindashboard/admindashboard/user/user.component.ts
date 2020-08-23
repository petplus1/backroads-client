import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { ListUsers } from "src/app/model/listUser.model";
import { User } from "src/app/model/user.model";

@Component({
  selector: "backroads-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  @Input() usList: ListUsers;

  @Output() newPage: EventEmitter<number>;
  @Output() searchName: EventEmitter<string>;

  @Output() userIdDel: EventEmitter<number>;

  constructor() {
    this.newPage = new EventEmitter();
    this.userIdDel = new EventEmitter();
    this.searchName = new EventEmitter();
  }

  ngOnInit() {}

  newPageEmit(newPage) {
    this.newPage.emit(newPage);
  }
  search(name: string) {
    if (name == "") {
      name = "*";
    }
    this.searchName.emit(name);
  }
  deleteLoca(id: number) {
    this.userIdDel.emit(id);
  }
  adminInfo(u: User) {
    alert("Cant delete user with role ADMIN , his user name " + u.username);
  }
}
