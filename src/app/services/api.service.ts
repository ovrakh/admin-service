import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Subject, Observable} from "rxjs/Rx";
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {
    
  }

  public get(url): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({'Authorization' : localStorage.getItem('token')})
  };
    return this.http.get(url, { headers : httpOptions.headers })
      .pipe(
        tap(_ => console.log('Success')),
        catchError(this.handleError<any>('Error'))
      )
  }

  public post(url, body): Observable<any> {
    return this.http.post(url, body, { headers: httpOptions.headers })
      .pipe(
        tap(_ => console.log('Sucsess')),
        catchError(this.handleError<any>('Error'))
      )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
