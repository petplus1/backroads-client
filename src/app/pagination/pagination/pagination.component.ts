import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'backroads-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number;
  @Input() pageSize: number;
  @Output() newPage: EventEmitter<number>;
  pages:number[];
  activePage:number=1;
  constructor() { 
    this.newPage=new EventEmitter();
  }
  getNoPage(){
    return Math.ceil(this.totalItems/this.pageSize);
  }
  ngOnInit() {
  }
  ngOnChanges(){
    this.pages=[];
    for(let i=1;this.getNoPage()+1>i;i++){
      this.pages.push(i);
    }
  }
  pageSelected(selectPage:number){
    if(selectPage>=1&&selectPage<this.getNoPage()+1){
      this.activePage=selectPage;
      this.newPage.emit(this.activePage-1);
    }
  }

}
