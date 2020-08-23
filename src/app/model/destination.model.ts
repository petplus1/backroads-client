import { Season } from './season.model';
import { Location } from './location.model';

export class Destination{
    _id:number;//
    name:string;
    country:string;//
    price:number;
    from:Date;
    to:Date;
    description:string;//
    picture:string;//
    location:Location;
    season:Season;
    constructor(obj?:any){
        this._id= obj && obj.id||null;
        this.name=obj&&obj.name||null;
        this.country=obj&&obj.country||null;
        this.price=obj&&obj.price||null;
        this.from=obj&&new Date(obj.from)||null;
        this.to=obj&&new Date(obj.to)||null;
        this.description=obj&&obj.description||null;
        this.picture=obj&&obj.picture||null;
        this.location=obj&&new Location(obj.location)||null;
        this.season=obj&&new Location(obj.season)||null;
    }
    calculateDateDifference(): number {
        let oneDay = 24*60*60*1000; 
        let diffDays = Math.round((this.to.getTime() - this.from.getTime())/(oneDay));
        return diffDays;
      }
}