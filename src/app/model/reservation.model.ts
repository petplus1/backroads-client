export class Reservation {
  _id: number;
  userId: number;
  destinationId: number;
  constructor(obj?: any) {
    this._id = (obj && obj.id) || null;
    this.userId = (obj && obj.userId) || null;
    this.destinationId = (obj && obj.destinationId) || null;
  }
}
