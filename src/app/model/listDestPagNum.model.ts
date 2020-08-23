import { Destination } from './destination.model';

export class ListSearchDest{
    totalPage:number;
    totalElements:number;
    destinations:Destination[];
    constructor(obj?:any){
        let totalPageNumber=Array(Number.parseInt(obj.headers.get("totalPages"))).fill(0).map((x,i)=>i);
        this.totalPage=obj&&totalPageNumber[totalPageNumber.length-1]||null;
        let totalElement=Array(Number.parseInt(obj.headers.get("totalElements"))).fill(0).map((x,i)=>i);
        this.totalElements=obj&&totalElement[totalElement.length-1]||null;
        this.destinations=obj.body.map(elem=>{return new Destination(elem)})||[];
    }
}