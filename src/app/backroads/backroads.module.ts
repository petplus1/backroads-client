import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeaturedComponent } from "./featured/featured.component";
import { PaginationModule } from "../pagination/pagination.module";
import { DetailsComponent } from "./featured/details/details.component";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
  declarations: [FeaturedComponent, DetailsComponent],
  imports: [CommonModule, PaginationModule, FormsModule, AppRoutingModule],
  exports: [FeaturedComponent],
})
export class BackroadsModule {}
