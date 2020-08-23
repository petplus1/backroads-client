import { User } from "./user.model";

export class LoggedUser {
  token: string;
  user: User;
  constructor(obj?: any) {
    this.token = (obj && obj.token) || null;
    this.user = (obj && obj.user) || null;
  }
}
