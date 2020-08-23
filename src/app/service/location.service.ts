import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from "../model/location.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ListLoca } from "../model/listLoca.model";
const baseUrl = "http://localhost:8080/api/location";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Location[]> {
    return this.http.get<Array<Location>>(baseUrl).pipe(
      map((response) => {
        let reVal = new Array<Location>();
        response.forEach((elem) => {
          reVal.push(new Location(elem));
        });
        return reVal;
      })
    );
  }
  findByName(params, token: any): Observable<ListLoca> {
    const headers = new HttpHeaders({ Authorization: "Bearer " + token });
    return this.http
      .get(
        `${baseUrl}/name?pageNum=${params.pageNum}&pageSize=${params.pageSize}&name=${params.name}`,
        { headers: headers, observe: "response" }
      )
      .pipe(
        map((response) => {
          return new ListLoca(response);
        })
      );
  }
  delete(id, token: any): Observable<Location> {
    const headers = new HttpHeaders({ Authorization: "Bearer " + token });
    return this.http
      .delete(`${baseUrl}/${id}`, { headers: headers, observe: "response" })
      .pipe(
        map((response) => {
          return new Location(response);
        })
      );
  }
  save(token: any, location: any): Observable<Location> {
    const headers = new HttpHeaders({ Authorization: "Bearer " + token });

    return this.http.post(`${baseUrl}`, location, { headers: headers }).pipe(
      map((res) => {
        return new Location(res);
      })
    );
  }
  edit(token: any, location: any): Observable<Location> {
    const headers = new HttpHeaders({ Authorization: "Bearer " + token });
    return this.http
      .put(`${baseUrl}/${location.id}`, location, { headers: headers })
      .pipe(
        map((res) => {
          return new Location(res);
        })
      );
  }
}
