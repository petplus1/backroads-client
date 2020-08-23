export class Photos{
    _id:number;
    picture:string;
    constructor(obj?:any){
        this._id=obj&&obj.id||null;
        this.picture=obj&&obj.picture||null;
    }
}