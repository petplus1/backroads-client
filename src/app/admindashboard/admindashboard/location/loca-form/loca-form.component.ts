import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Location } from "src/app/model/location.model";

@Component({
  selector: "backroads-loca-form",
  templateUrl: "./loca-form.component.html",
  styleUrls: ["./loca-form.component.css"],
})
export class LocaFormComponent implements OnInit {
  @Input() forEdit: Location;

  location: Location = new Location();

  @Output() locationToSave: EventEmitter<Location>;
  @Output() locationToEdit: EventEmitter<Location>;

  constructor() {
    this.locationToEdit = new EventEmitter();
    this.locationToSave = new EventEmitter();
  }

  ngOnInit() {
    if (this.forEdit != undefined) {
      this.location = this.forEdit;
    }
  }

  saveLocation() {
    this.location.ind_search = this.location.name.toLocaleLowerCase();
    this.locationToSave.emit(this.location);
  }
  editLocation() {
    this.locationToEdit.emit(this.location);
  }
}
