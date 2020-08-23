export class User {
  _id: number;
  name: string;
  username: string;
  password: string;
  creationDate: Date;
  email: string;
  authorities: [];
  userAuthority: [];
  constructor(obj?: any) {
    this._id = (obj && obj.id) || null;
    this.name = (obj && obj.name) || null;
    this.username = (obj && obj.username) || null;
    this.password = (obj && obj.password) || null;
    this.creationDate = (obj && new Date(obj.createdDate)) || null;
    this.email = (obj && obj.email) || null;
    this.authorities = (obj && obj.authorities) || [];
    this.userAuthority = (obj && obj.userAuthority) || [];
  }
}
