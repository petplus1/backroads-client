import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'backroads-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	  date: string;
  constructor() { }

  ngOnInit() {
   this.date = new Date().getFullYear().toString();
  }

}
