import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Listeatt } from 'src/app/Models/Listeatt';
import { Observable, of } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ListeattService {

  private classesUrl = 'http://localhost:59316/api/Listeatts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  modalRef: BsModalRef;

  constructor(private http: HttpClient, public modalservice: BsModalService) { }

  public openModel(template: TemplateRef<any>) {
    this.modalRef = this.modalservice.show(template);

  }





  addCListeatt(ll: Listeatt) {

    return this.http.post<Listeatt>(this.classesUrl, ll, this.httpOptions).pipe(
      catchError(this.handleError<Listeatt>('addlisteatt'))
    );

  }

  deleteListatt(id: number) {
    const url = `${this.classesUrl}/${id}`;
    return this.http.delete<Listeatt>(url + "", this.httpOptions).pipe(
      catchError(this.handleError<Listeatt>('deleteListatt'))
    );
  }

  editListeatt(cmt: Listeatt): Observable<Listeatt[]> {
    return this.http.put<Listeatt[]>(this.classesUrl, cmt, this.httpOptions)
      .pipe(
        catchError(this.handleError<Listeatt[]>('editListeatt', []))
      );
  }


  getlist(): Observable<Listeatt[]> {

    return this.http.get<Listeatt[]>(this.classesUrl)
      .pipe(
        catchError(this.handleError<Listeatt[]>('getList', []))
      );
  }




  getListeatt(id: number): Observable<Listeatt[]> {

    const url = `${this.classesUrl}/${id}`;
    return this.http.get<Listeatt[]>(url).pipe(
      catchError(this.handleError<Listeatt[]>(`getListeatt id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };


  }

}
