import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Uploadedfile } from 'src/app/Models/Uploadedfile';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  };
  private Url = 'http://localhost:59316/api/';

  constructor(private http: HttpClient) { }



  downloadFile(file: Uploadedfile) {


    return this.http.post(this.Url + "Download", file, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  getfiles() {
    return this.http.get<Uploadedfile[]>(this.Url + "Uploadedfile")
      .pipe(
        catchError(this.handleError<Uploadedfile[]>('getfiles', []))
      );
  }


  addfiles(l: Uploadedfile) {
    return this.http.post<Uploadedfile>(this.Url + "Uploadedfile", l, this.httpOptions);
  }
  upload(formData) {
    return this.http.post<string[]>(this.Url + "Upload", formData, { reportProgress: true, observe: 'events' });
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
