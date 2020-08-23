import { Component, OnInit } from "@angular/core";
import { DestinationService } from "src/app/service/destination.service";
import { ListSearchDest } from "src/app/model/listDestPagNum.model";
import { Photos } from "src/app/model/photos.model";
import { LoginAuthService } from "src/app/service/login-auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  listSearchDest: ListSearchDest;
  photos: Photos[];
  constructor(
    private destinationService: DestinationService,
    private authService: LoginAuthService
  ) {
    this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.getAllDestinations();
    this.getPhotos();
  }

  getAllDestinations() {
    let params = {
      pageNum: 0,
      pageSize: 6,
      sortLocation: "*",
      sortSeason: "*",
      order_by: "price",
    };
    this.destinationService.findAll(params).subscribe((response) => {
      this.listSearchDest = response;
    });
  }
  getPhotos() {
    this.destinationService.findPhotos().subscribe((response) => {
      this.photos = response;
    });
  }
}
