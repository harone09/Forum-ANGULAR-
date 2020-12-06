import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Listefinal } from 'src/app/Models/Listefinal';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListefinalService {

  private classesUrl = 'http://localhost:59316/api/Listefinal';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {

  }

  addlisteF(cl: Listefinal) {
    return this.http.post<Listefinal>(this.classesUrl, cl, this.httpOptions).pipe(
      catchError(this.handleError<Listefinal>('addlist'))
    );
  }

  deleteLF(id: number) {
    const url = `${this.classesUrl}/${id}`;
    return this.http.delete<Listefinal>(url + "", this.httpOptions).pipe(
      catchError(this.handleError<Listefinal>('deletelist'))
    );
  }

  editLF(cmt: Listefinal): Observable<Listefinal[]> {
    return this.http.put<Listefinal[]>(this.classesUrl, cmt, this.httpOptions)
      .pipe(
        catchError(this.handleError<Listefinal[]>('editlist', []))
      );
  }


  getLF(): Observable<Listefinal[]> {

    return this.http.get<Listefinal[]>(this.classesUrl)
      .pipe(
        catchError(this.handleError<Listefinal[]>('getClasses', []))
      );
  }

  getLFF(id: number): Observable<Listefinal[]> {

    const url = `${this.classesUrl}/${id}`;
    return this.http.get<Listefinal[]>(url).pipe(
      catchError(this.handleError<Listefinal[]>(`getClassee id=${id}`))
    );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      return of(result as T);
    };

  }
}
