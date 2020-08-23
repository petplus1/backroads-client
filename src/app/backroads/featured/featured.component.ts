import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  AfterViewInit,
  QueryList,
} from "@angular/core";
import { Season } from "../../model/season.model";
import { Location } from "../../model/location.model";
import { DestinationService } from "../../service/destination.service";
import { ListSearchDest } from "../../model/listDestPagNum.model";
import { SeasonService } from "../../service/season.service";
import { LocationService } from "../../service/location.service";
@Component({
  selector: "app-featured",
  templateUrl: "./featured.component.html",
  styleUrls: ["./featured.component.css"],
})
export class FeaturedComponent implements OnInit, AfterViewInit {
  listSearchDest: ListSearchDest;
  loca: Location[];
  seas: Season[];

  sortLocation: string;

  params = {
    pageNum: 0,
    pageSize: 9,
    sortLocation: "*",
    sortSeason: "*",
    order_by: "id",
  };

  @ViewChildren("season") seasonElements;

  constructor(
    private destinationService: DestinationService,
    private seasonService: SeasonService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.resortProposal();
    this.getAllDestinations();
    this.getAllSeasons();
    this.getAllLocations();
  }
  ngAfterViewInit() {}

  resortProposal() {
    document.getElementById(String(0)).classList.add("active");
  }

  activate(id) {
    this.seasonElements.forEach((e) => {
      if (e.nativeElement.id == id) {
        e.nativeElement.classList.add("active");
      } else {
        e.nativeElement.classList.remove("active");
      }
    });

    switch (id) {
      case "0":
        this.params.sortSeason = "*";
        this.getAllDestinations();
        break;
      case "1":
        this.params.sortSeason = "1";
        this.getAllDestinations();
        break;
      case "2":
        this.params.sortSeason = "2";
        this.getAllDestinations();
        break;
      case "3":
        this.params.sortSeason = "3";
        this.getAllDestinations();
        break;
      case "4":
        this.params.sortSeason = "4";
        this.getAllDestinations();
        break;
    }
  }

  updateCriteria() {
    this.params.sortLocation = this.sortLocation;
    this.getAllDestinations();
  }

  getAllDestinations() {
    this.destinationService.findAll(this.params).subscribe((response) => {
      this.listSearchDest = response;
    });
  }

  getAllSeasons() {
    this.seasonService.findAll().subscribe((response) => {
      this.seas = response;
    });
  }

  getAllLocations() {
    this.locationService.findAll().subscribe((response) => {
      this.loca = response;
    });
  }

  onPageChange(newPage) {
    this.params.pageNum = newPage;
    this.getAllDestinations();
  }
}
