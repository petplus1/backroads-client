export class Location{
    _id:number;
    name:string;
    ind_search:string;
    constructor(obj?:any){
        this._id=obj&&obj.id||null;
        this.name=obj&&obj.name||null;
        this.ind_search=obj&&obj.ind_search||null;
    }
}