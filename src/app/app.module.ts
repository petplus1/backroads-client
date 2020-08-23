import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./core/nav-bar/nav-bar.component";
import { HomeComponent } from "./core/home/home.component";
import { ServicesProjectComponent } from "./core/services-project/services-project.component";
import { AboutComponent } from "./core/about/about.component";
import { FooterComponent } from "./core/footer/footer.component";
import { JoinAsComponent } from "./core/join-as/join-as.component";
import { LogInComponent } from "./core/join-as/log-in/log-in.component";
import { RegisterComponent } from "./core/join-as/register/register.component";
import { UserInfoComponent } from "./core/user-info/user-info.component";
import { AdmindashboardModule } from "./admindashboard/admindashboard.module";
import { PaginationModule } from "./pagination/pagination.module";
import { BackroadsModule } from "./backroads/backroads.module";


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ServicesProjectComponent,
    AboutComponent,
    FooterComponent,
    JoinAsComponent,
    LogInComponent,
    RegisterComponent,
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AdmindashboardModule,
    PaginationModule,
    BackroadsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
