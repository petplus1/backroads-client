import { Location } from "./location.model";

export class ListLoca {
  totalPage: number;
  totalElements: number;
  locations: Location[];
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
    this.locations =
      obj.body.map((elem) => {
        return new Location(elem);
      }) || [];
  }
}
