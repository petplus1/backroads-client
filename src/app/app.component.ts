import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("navBar") navbar: ElementRef;
  ngAfterViewInit() {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 61) {
        this.navbar.nativeElement.classList.add("fixed");
      } else {
        this.navbar.nativeElement.classList.remove("fixed");
      }
    });
  }
}
