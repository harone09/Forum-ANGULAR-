import { Injectable } from '@angular/core';
import { ListUsers } from "../../DataTest/MockUsers";
import { Observable, of } from "rxjs";
import { User } from 'src/app/Models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  };

  private usersUrl = 'http://localhost:59316/api/';

  us: User[] = [];
  constructor(private http: HttpClient) {
    this.http.get<User[]>(this.usersUrl + "User").toPromise().then(c => {
      for (let p of c) {
        this.us.push({ email: p.email, name: p.name, password: p.password, phone: p.phone, role: p.role, id: p.id, login: p.login });
      }
    });

  }

  checkUser(cmt: User): Observable<User[]> {
    return this.http.put<User[]>(this.usersUrl + "Login", cmt, this.httpOptions)
      .pipe(
        catchError(this.handleError<User[]>('editUser', []))
      );
  }


  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.usersUrl + "User")
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );

  }

  registerUser(cmt: User): Observable<User[]> {
    return this.http.post<User[]>(this.usersUrl + "Login", cmt, this.httpOptions)
      .pipe(
        catchError(this.handleError<User[]>('registerUser', []))
      );
  }

  editUser(cmt: User): Observable<User[]> {
    return this.http.put<User[]>(this.usersUrl + "User", cmt, this.httpOptions)
      .pipe(
        catchError(this.handleError<User[]>('editUser', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };

  }
}