import { Injectable } from "@angular/core";
import { Season } from "../model/season.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

const baseUrl = "http://localhost:8080/api/season";

@Injectable({
  providedIn: "root",
})
export class SeasonService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Season[]> {
    return this.http.get<Array<Season>>(baseUrl).pipe(
      map((response) => {
        let reVal = new Array<Season>();
        response.forEach((elem) => {
          reVal.push(new Season(elem));
        });
        return reVal;
      })
    );
  }
}
