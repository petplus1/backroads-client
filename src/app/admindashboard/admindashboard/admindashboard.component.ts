import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { fromEvent, Subscription } from "rxjs";
import { LoginAuthService } from "src/app/service/login-auth.service";
import { DestinationService } from "src/app/service/destination.service";
import { SeasonService } from "src/app/service/season.service";
import { LocationService } from "src/app/service/location.service";
import { UserService } from "src/app/service/user.service";
import { User } from "src/app/model/user.model";
import { ListSearchDest } from "src/app/model/listDestPagNum.model";
import { ListLoca } from "src/app/model/listLoca.model";
import { ListUsers } from "src/app/model/listUser.model";
import { Season } from "src/app/model/season.model";
import { Location } from "src/app/model/location.model";

@Component({
  selector: "app-admindashboard",
  templateUrl: "./admindashboard.component.html",
  styleUrls: ["./admindashboard.component.css"],
})
export class AdmindashboardComponent implements OnInit {
  listSearchDest: ListSearchDest;
  locaListAndHeaders: ListLoca;
  listUsers: ListUsers;
  locations: Location[];
  seasons: Season[];

  @ViewChild("destComp") destComp: ElementRef;
  @ViewChild("locaComp") locaComp: ElementRef;
  @ViewChild("userComp") userComp: ElementRef;

  clickedElement: Subscription = new Subscription();
  admin: User;

  adminStatus: boolean;
  destCopDis: boolean = true;
  locaCopDis: boolean = false;
  userCopDis: boolean = false;

  params = {
    pageNum: 0,
    pageSize: 10,
    name: "*",
  };

  token: any;

  constructor(
    private router: Router,
    private authService: LoginAuthService,
    private destinationService: DestinationService,
    private seasonService: SeasonService,
    private locationService: LocationService,
    private userService: UserService
  ) {
    this.authService.getAdminSutatus().subscribe((res) => {
      this.adminStatus = res;
    });
    this.authService.getUser().subscribe((res) => {
      this.admin = res;
    });
    this.authService.getToken().subscribe((res) => {
      this.token = res;
    });
    this.authService.isLoggedIn();
    if (!this.adminStatus) {
      this.router.navigate(["/home"]);
    }
  }
  ngAfterViewInit() {
    this.onLoad();

    this.clickedElement = fromEvent(
      this.destComp.nativeElement,
      "click"
    ).subscribe(() => {
      this.destComp.nativeElement.classList.add("active");
      this.locaComp.nativeElement.classList.remove("active");
      this.userComp.nativeElement.classList.remove("active");
      this.destCopDis = true;
      this.locaCopDis = false;
      this.userCopDis = false;
    });
    this.clickedElement = fromEvent(
      this.locaComp.nativeElement,
      "click"
    ).subscribe(() => {
      this.destComp.nativeElement.classList.remove("active");
      this.locaComp.nativeElement.classList.add("active");
      this.userComp.nativeElement.classList.remove("active");
      this.destCopDis = false;
      this.locaCopDis = true;
      this.userCopDis = false;
    });
    this.clickedElement = fromEvent(
      this.userComp.nativeElement,
      "click"
    ).subscribe(() => {
      this.destComp.nativeElement.classList.remove("active");
      this.locaComp.nativeElement.classList.remove("active");
      this.userComp.nativeElement.classList.add("active");
      this.destCopDis = false;
      this.locaCopDis = false;
      this.userCopDis = true;
    });
  }
  ngOnDestroy() {
    this.clickedElement.unsubscribe();
  }
  ngOnInit() {
    this.getAllDestinations();
    this.getAllLocations();
    this.getAllSeasons();
    this.getAllLocationsByName();
    this.getAllUsers();
  }
  onLoad() {
    this.destComp.nativeElement.classList.add("active");
  }
  getAllDestinations() {
    this.destinationService
      .findByName(this.params, this.token)
      .subscribe((response) => {
        this.listSearchDest = response;
      });
  }
  getAllUsers() {
    this.userService
      .findByName(this.params, this.token)
      .subscribe((response) => {
        this.listUsers = response;
      });
  }
  getAllLocationsByName() {
    this.locationService
      .findByName(this.params, this.token)
      .subscribe((response) => {
        this.locaListAndHeaders = response;
      });
  }
  newPageEmit(newPage) {
    this.params.pageNum = newPage;
    this.getAllDestinations();
  }
  onPageChange(newPage) {
    this.params.pageNum = newPage;
    this.getAllDestinations();
  }
  inputNameDest(name: string) {
    this.params.name = name;
    this.getAllDestinations();
  }
  inputNameLoca(name: string) {
    this.params.name = name;
    this.getAllLocationsByName();
  }
  inputNameUser(name: string) {
    this.params.name = name;
    this.getAllUsers();
  }
  deleteDest(id: number) {
    this.destinationService.delete(id, this.token).subscribe(
      (res) => {
        this.getAllDestinations();
        alert("Succesfull delete of destination with id " + id);
      },
      (error) => {
        alert("Server cant delete destinatio with id " + id + " ,try later.");
      }
    );
  }
  deleteUser(id: number) {
    this.userService.delete(id, this.token).subscribe(
      (res) => {
        this.getAllUsers();
        alert("Succesfull delete of user with id " + id);
      },
      (error) => {
        alert("Server cant delete user with id " + id + " ,try later.");
      }
    );
  }
  deleteLoca(id: number) {
    this.locationService.delete(id, this.token).subscribe(
      (res) => {
        this.getAllLocations();
        alert("Succesfull delete of Location with id " + id);
      },
      (error) => {
        alert("Server cant delete Location with id " + id + " ,try later.");
      }
    );
  }
  getAllLocations() {
    this.locationService.findAll().subscribe((response) => {
      this.locations = response;
    });
  }
  getAllSeasons() {
    this.seasonService.findAll().subscribe((response) => {
      this.seasons = response;
    });
  }
  saveDestination(destination: any) {
    destination.from = `${destination.from.year}-${destination.from.month}-${destination.from.day} 00:00:00`;
    destination.to = `${destination.to.year}-${destination.to.month}-${destination.to.day} 00:00:00`;
    destination.location = { id: destination.location };
    destination.season = { id: destination.season };
    this.destinationService.save(this.token, destination).subscribe(
      (res) => {
        this.getAllDestinations();
        alert("Succes Saved new Dest");
      },
      (error) => {
        alert("Error saving destination");
      }
    );
  }
  saveLocation(location: Location) {
    let l = {
      id: location._id,
      name: location.name,
      ind_search: location.ind_search,
    };
    this.locationService.save(this.token, l).subscribe(
      (res) => {
        this.getAllLocations();

        alert("Succes Saved new Location");
      },
      (error) => {
        alert("Error saving location");
      }
    );
  }
  editDestination(destination: any) {
    destination.id = destination._id;
    delete destination._id;
    destination.from = `${destination.from.year}-${destination.from.month}-${destination.from.day} 00:00:00`;
    destination.to = `${destination.to.year}-${destination.to.month}-${destination.to.day} 00:00:00`;
    destination.location = { id: destination.location._id };
    destination.season = { id: destination.season._id };
    this.destinationService.edit(this.token, destination).subscribe(
      (res) => {
        this.getAllDestinations();

        alert("Succes edited  Dest");
      },
      (error) => {
        alert("Error editing destination");
      }
    );
  }
  editLocation(location: Location) {
    let l = {
      id: location._id,
      name: location.name,
      ind_search: location.ind_search,
    };
    this.locationService.edit(this.token, l).subscribe(
      (res) => {
        this.getAllLocations();

        alert("Succes edited  location");
      },
      (error) => {
        alert("Error editing location");
      }
    );
  }
}
