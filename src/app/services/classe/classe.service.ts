import { Injectable } from '@angular/core';
import { ListClasses } from "../../DataTest/MockClasses";
import { Observable, of } from "rxjs";
import { Classe } from 'src/app/Models/Classe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private classesUrl = 'http://localhost:59316/api/Classe';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {

  }


  getClasses(): Observable<Classe[]> {

    return this.http.get<Classe[]>(this.classesUrl)
      .pipe(
        catchError(this.handleError<Classe[]>('getClasses', []))
      );
  }

  //////////////////
  addClass(cl: Classe) {
    return this.http.post<Classe>(this.classesUrl, cl, this.httpOptions).pipe(
      catchError(this.handleError<Classe>('addClass'))
    );
  }

  deleteClass(id: number) {
    const url = `${this.classesUrl}/${id}`;
    return this.http.delete<Classe>(url + "", this.httpOptions).pipe(
      catchError(this.handleError<Classe>('deleteclass'))
    );
  }

  editClass(cmt: Classe): Observable<Classe[]> {

    return this.http.put<Classe[]>(this.classesUrl, cmt, this.httpOptions)
      .pipe(
        catchError(this.handleError<Classe[]>('editClass', []))
      );
  }


  /////////////////////////////////////


  getClassee(id: number): Observable<Classe[]> {

    const url = `${this.classesUrl}/${id}`;
    return this.http.get<Classe[]>(url).pipe(
      catchError(this.handleError<Classe[]>(`getClassee id=${id}`))
    );

  }



  ///////////////////////////////////////
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