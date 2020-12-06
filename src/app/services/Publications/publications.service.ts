import { Injectable } from '@angular/core';
import { ListPublication } from "../../DataTest/MockPublications";
import { Observable, of } from "rxjs";
import { Publication } from 'src/app/Models/Publication';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  private classesUrl = 'http://localhost:59316/api/Publication';

  pubs: Publication[] = [];

  constructor(private http: HttpClient) {


  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  };


  addPublication(pub: Publication) {
    return this.http.post<Publication>(this.classesUrl, pub, this.httpOptions).pipe(
      catchError(this.handleError<Publication>('addPublication'))
    );
  }

  deletePublication(id: number) {
    const url = `${this.classesUrl}/${id}`;
    return this.http.delete<Publication>(url + "", this.httpOptions).pipe(
      catchError(this.handleError<Publication>('deletePublication'))
    );
  }



  getPublications(id: number): Observable<Publication[]> {
    if (id == 0) {
      return this.http.get<Publication[]>(this.classesUrl)
        .pipe(
          catchError(this.handleError<Publication[]>('getPublications', []))
        );
    }
    const url = `${this.classesUrl}/${id}`;
    return this.http.get<Publication[]>(url).pipe(
      catchError(this.handleError<Publication[]>(`getPublications id=${id}`))
    );
    // return of(this.pubs);

    //return of(ListPublication);
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