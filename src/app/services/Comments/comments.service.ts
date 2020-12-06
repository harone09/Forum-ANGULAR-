import { Injectable } from '@angular/core';
import { ListComments } from 'src/app/DataTest/MockComments';
import { Comment } from "../../Models/Comment";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private classesUrl = 'http://localhost:59316/api/Comment';

  constructor(private http: HttpClient) { }
  /*
    updateComment(cmt: Comment) {
      return this.http.put(this.classesUrl, cmt, this.httpOptions).pipe(
        catchError(this.handleError<Comment>('updateComment'))
      );
    }
  */
  addComment(cmt: Comment) {
    return this.http.post<Comment>(this.classesUrl, cmt, this.httpOptions).pipe(
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  deleteComment(id: number) {
    const url = `${this.classesUrl}/${id}`;
    return this.http.delete<Comment>(url, this.httpOptions).pipe(
      catchError(this.handleError<Comment>('deleteComment'))
    );
  }

  editComment(cmt: Comment): Observable<Comment[]> {
    return this.http.put<Comment[]>(this.classesUrl, cmt, this.httpOptions)
      .pipe(
        catchError(this.handleError<Comment[]>('editComment', []))
      );
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.classesUrl)
      .pipe(
        catchError(this.handleError<Comment[]>('getComments', []))
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
