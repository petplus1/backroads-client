import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ListSearchDest } from "src/app/model/listDestPagNum.model";
import { Destination } from "src/app/model/destination.model";
import { Location } from "src/app/model/location.model";
import { Season } from "src/app/model/season.model";

@Component({
  selector: "backroads-destination",
  templateUrl: "./destination.component.html",
  styleUrls: ["./destination.component.css"],
})
export class DestinationComponent implements OnInit {
  @Input() listDestAndMore: ListSearchDest;

  @Output() newPage: EventEmitter<number>;
  @Output() searchName: EventEmitter<string>;

  @Output() destIdToDele: EventEmitter<number>;

  @Output() destinaToSave: EventEmitter<any>;
  @Output() destinaToEdit: EventEmitter<any>;

  toggle: boolean = true;
  destForEdit: Destination;
  @Input() getLocations: Location[];
  @Input() getSeasons: Season[];

  constructor() {
    this.newPage = new EventEmitter();
    this.destIdToDele = new EventEmitter();
    this.searchName = new EventEmitter();
    this.destinaToEdit = new EventEmitter();
    this.destinaToSave = new EventEmitter();
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
  destinationsToDelete(id: number) {
    this.destIdToDele.emit(id);
  }
  newDest() {
    this.toggle = false;
    this.destForEdit = undefined;
  }
  editDest(destination: Destination) {
    this.destForEdit = destination;
    this.toggle = false;
  }
  back() {
    this.toggle = true;
  }
  saveDestination(destination: any) {
    this.destinaToSave.emit(destination);
    this.toggle = true;
  }
  editDestination(destination: any) {
    this.destinaToEdit.emit(destination);
    this.toggle = true;
  }
}
