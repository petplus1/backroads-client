import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Destination } from "../model/destination.model";
import { ListSearchDest } from "../model/listDestPagNum.model";
import { Photos } from "../model/photos.model";

const baseUrl = "http://localhost:8080/api/destination";
@Injectable({
  providedIn: "root",
})
export class DestinationService {
  constructor(private http: HttpClient) {}

  findAll(params): Observable<ListSearchDest> {
    const headers = new HttpHeaders();
    return this.http
      .get(
        `${baseUrl}?pageNum=${params.pageNum}&pageSize=${params.pageSize}&sortLocation=${params.sortLocation}&sortSeason=${params.sortSeason}&order_by=${params.order_by}`,
        { headers: headers, observe: "response" }
      )
      .pipe(
        map((response) => {
          return new ListSearchDest(response);
        })
      );
  }
  findByName(params, token: any): Observable<ListSearchDest> {
    const headers = new HttpHeaders({ Authorization: "Bearer " + token });
    return this.http
      .get(
        `${baseUrl}/name?pageNum=${params.pageNum}&pageSize=${params.pageSize}&name=${params.name}`,
        { headers: headers, observe: "response" }
      )
      .pipe(
        map((response) => {
          return new ListSearchDest(response);
        })
      );
  }
  delete(id, token: any): Observable<Destination> {
    const headers = new HttpHeaders({ Authorization: "Bearer " + token });
    return this.http
      .delete(`${baseUrl}/${id}`, { headers: headers, observe: "response" })
      .pipe(
        map((response) => {
          return new Destination(response);
        })
      );
  }

  getById(id: number): Observable<Destination> {
    return this.http.get(`${baseUrl}/${id}`).pipe(
      map((res) => {
        return new Destination(res);
      })
    );
  }
  findPhotos(): Observable<Photos[]> {
    return this.http.get<Array<Photos>>(`${baseUrl}/photos`).pipe(
      map((response) => {
        let retVal = new Array<Photos>();
        response.forEach((elem) => {
          retVal.push(new Photos(elem));
        });
        return retVal;
      })
    );
  }
  save(token: any, destination: any): Observable<Destination> {
    const headers = new HttpHeaders({ Authorization: "Bearer " + token });

    return this.http.post(`${baseUrl}`, destination, { headers: headers }).pipe(
      map((res) => {
        return new Destination(res);
      })
    );
  }
  edit(token: any, destination: any): Observable<Destination> {
    const headers = new HttpHeaders({ Authorization: "Bearer " + token });
    return this.http
      .put(`${baseUrl}/${destination.id}`, destination, { headers: headers })
      .pipe(
        map((res) => {
          return new Destination(res);
        })
      );
  }
}
