import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { ListLoca } from "src/app/model/listLoca.model";

@Component({
  selector: "backroads-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"],
})
export class LocationComponent implements OnInit {
  @Input() listLoca: ListLoca;

  @Output() newPage: EventEmitter<number>;
  @Output() searchName: EventEmitter<string>;

  @Output() locationIdDel: EventEmitter<number>;

  @Output() locaToSave: EventEmitter<Location>;
  @Output() locaToEdit: EventEmitter<Location>;

  toggle: boolean = true;
  locationToEdit: Location;

  constructor() {
    this.newPage = new EventEmitter();
    this.locationIdDel = new EventEmitter();
    this.searchName = new EventEmitter();
    this.locaToEdit = new EventEmitter();
    this.locaToSave = new EventEmitter();
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
    this.locationIdDel.emit(id);
  }
  newLoca() {
    this.toggle = false;
    this.locationToEdit = undefined;
  }
  editLoca(location: Location) {
    this.locationToEdit = location;
    this.toggle = false;
  }
  back() {
    this.toggle = true;
  }
  saveLocation(location: any) {
    this.locaToSave.emit(location);
    this.toggle = true;
  }
  editLocation(location: any) {
    this.locaToEdit.emit(location);
    this.toggle = true;
  }
}
