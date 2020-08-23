import { Component, OnInit } from "@angular/core";
import { DestinationService } from "../../../service/destination.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Destination } from "../../../model/destination.model";
import { LoginAuthService } from "../../../service/login-auth.service";
import { User } from "../../../model/user.model";
import { ReservationService } from "../../../service/reservation.service";
import { Reservation } from "../../../model/reservation.model";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit {
  destination: Destination;
  logedUser: User;

  userStatus: boolean;

  token: any;

  constructor(
    private route: ActivatedRoute,
    private destService: DestinationService,
    private router: Router,
    private authService: LoginAuthService,
    private reservationService: ReservationService
  ) {
    this.authService.getSutatus().subscribe((res) => {
      this.userStatus = res;
    });
    this.authService.getToken().subscribe((res) => {
      this.token = res;
    });
    this.authService.getUser().subscribe((res) => {
      this.logedUser = res;
    });

    this.authService.isLoggedIn();
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.destService
      .getById(Number(id))
      .subscribe((data) => (this.destination = data));
  }
  reserve() {
    if (this.userStatus) {
      this.reservationService
        .reservation(
          this.token,
          new Reservation({
            userId: this.logedUser._id,
            destinationId: this.destination._id,
          })
        )
        .subscribe(
          (res) => {
            alert("Succes , you made reservation!");
          },
          (error) => {
            alert("Sometging wrong with serve try latter!");
          }
        );
      console.log({
        userId: this.logedUser._id,
        destinationId: this.destination._id,
      });
    } else {
      this.router.navigate(["/join_as"]);
    }
  }
}
