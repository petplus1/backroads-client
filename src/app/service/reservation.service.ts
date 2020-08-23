import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Reservation } from "../model/reservation.model";
import { HttpHeaders, HttpClient } from "@angular/common/http";

const baseUrl = "http://localhost:8080/api/reservation";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  reservation(token: any, reservation: Reservation): Observable<Reservation> {
    const headers = new HttpHeaders({ Authorization: "Bearer " + token });
    return this.http.post(`${baseUrl}`, reservation, { headers: headers }).pipe(
      map((res) => {
        return new Reservation(res);
      })
    );
  }
}
