import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';



const endpoint = 'http://localhost:8000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getUrls(): Observable<any> {
    return this.http.get(endpoint + 'urls', httpOptions).pipe(
      catchError(this.handleError<any>('urls'))
    );
  }

  getUrl(shortUrl): Observable<any> {
    return this.http.get(endpoint + 'urls/' + shortUrl, httpOptions).pipe(
      catchError(this.handleError<any>('urls/' + shortUrl))
    );
  }

  loginUser(userInfo): Observable<any> {
    return this.http.post(endpoint + 'login', {
      email: userInfo.email,
      password: userInfo.password
    }, httpOptions).pipe(
      catchError(this.handleError<any>('login '))
    );
  }

  registerUser(userInfo): Observable<any> {
    console.log(userInfo);
    return this.http.post(endpoint + 'sign_up', {
      email: userInfo.email,
      password: userInfo.password,
      username: userInfo.userName,
    }, httpOptions).pipe(
      catchError(this.handleError<any>('sign_up '))
    );
  }

  createUrl(url, shortUrl = ''): Observable<any> {
    return this.http.post(endpoint + 'create_url', {
      url: url,
      shortUrl: shortUrl
    }, httpOptions).pipe(
      catchError(this.handleError<any>('create_url'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
