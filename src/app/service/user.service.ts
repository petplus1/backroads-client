import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../model/user.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoggedUser } from "../model/loggedUser.model";
import { ListUsers } from "../model/listUser.model";

const baseUrl = "http://localhost:8080/api/users";
const loginUrl = "http://localhost:8080/api/auth/login";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
  loginUser(user: User): Observable<LoggedUser> {
    const headers = new HttpHeaders({ "Access-Controll-Allow-Origin": "*" });
    return this.http.post(`${loginUrl}`, user, { headers: headers }).pipe(
      map((res) => {
        return new LoggedUser(res);
      })
    );
  }

  register(user: User): Observable<User> {
    let u = {
      name: user.name,
      username: user.username,
      password: user.password,
      creationDate: `${user.creationDate.getFullYear()}-${
        user.creationDate.getUTCMonth() + 1
      }-${user.creationDate.getDate()} ${user.creationDate.getHours()}:${user.creationDate.getMinutes()}:${user.creationDate.getSeconds()}`,
      email: user.email,
    };
    return this.http.post(`${baseUrl}`, u).pipe(
      map((res) => {
        return new User(res);
      })
    );
  }
  newName(token: any, user: User): Observable<User> {
    const headers = new HttpHeaders({ Authorization: "Bearer " + token });
    return this.http
      .put(`${baseUrl}/${user._id}`, user, { headers: headers })
      .pipe(
        map((res) => {
          return new User(res);
        })
      );
  }
  findByName(params, token: any): Observable<ListUsers> {
    const headers = new HttpHeaders({ Authorization: "Bearer " + token });
    return this.http
      .get(
        `${baseUrl}/name?pageNum=${params.pageNum}&pageSize=${params.pageSize}&name=${params.name}`,
        { headers: headers, observe: "response" }
      )
      .pipe(
        map((response) => {
          return new ListUsers(response);
        })
      );
  }
  delete(id, token: any): Observable<User> {
    const headers = new HttpHeaders({ Authorization: "Bearer " + token });
    return this.http
      .delete(`${baseUrl}/${id}`, { headers: headers, observe: "response" })
      .pipe(
        map((response) => {
          return new User(response);
        })
      );
  }
}
