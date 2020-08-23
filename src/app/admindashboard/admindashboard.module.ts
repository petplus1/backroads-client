import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { DestinationComponent } from "./admindashboard/destination/destination.component";
import { LocationComponent } from "./admindashboard/location/location.component";
import { UserComponent } from "./admindashboard/user/user.component";
import { FormComponent } from "./admindashboard/destination/form/form.component";
import { LocaFormComponent } from "./admindashboard/location/loca-form/loca-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PaginationModule } from "../pagination/pagination.module";

@NgModule({
  declarations: [
    AdmindashboardComponent,
    DestinationComponent,
    LocationComponent,
    UserComponent,
    FormComponent,
    LocaFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
  ],
  exports: [AdmindashboardComponent],
})
export class AdmindashboardModule {}
