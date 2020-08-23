import { User } from "./user.model";

export class ListUsers {
  totalPage: number;
  totalElements: number;
  users: User[];
  constructor(obj?: any) {
    let totalPageNumber = Array(Number.parseInt(obj.headers.get("totalPages")))
      .fill(0)
      .map((x, i) => i);
    this.totalPage =
      (obj && totalPageNumber[totalPageNumber.length - 1]) || null;
    let totalElement = Array(Number.parseInt(obj.headers.get("totalElements")))
      .fill(0)
      .map((x, i) => i);
    this.totalElements = (obj && totalElement[totalElement.length - 1]) || null;
    this.users =
      obj.body.map((elem) => {
        return new User(elem);
      }) || [];
  }
}
