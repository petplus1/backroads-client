import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  DoCheck,
  Output,
  EventEmitter,
} from "@angular/core";
import { Destination } from "src/app/model/destination.model";
import { Season } from "src/app/model/season.model";

@Component({
  selector: "dest-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  @Input() forEdit: Destination;

  destination: any = {};

  @Input() loca: Location[];
  @Input() seas: Season[];

  @Output() destinaToSave: EventEmitter<any>;
  @Output() destinaToEdit: EventEmitter<any>;

  constructor() {
    this.destinaToEdit = new EventEmitter();
    this.destinaToSave = new EventEmitter();
  }

  ngOnInit() {
    if (this.forEdit != undefined) {
      this.destination = this.forEdit;
      this.destination.from.year = this.forEdit.from.getFullYear();
      this.destination.from.month = this.forEdit.from.getMonth() + 1;
      this.destination.from.day = this.forEdit.from.getDate();
      this.destination.to.year = this.forEdit.to.getFullYear();
      this.destination.to.month = this.forEdit.to.getMonth() + 1;
      this.destination.to.day = this.forEdit.to.getDate();
    }
  }

  saveDestinatination() {
    this.destinaToSave.emit(this.destination);
  }
  editDesti() {
    this.destinaToEdit.emit(this.destination);
  }
}
