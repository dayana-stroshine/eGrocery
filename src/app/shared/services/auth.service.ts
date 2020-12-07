import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from "rxjs";
// Gives back first response without unsubscribing.
import { first, tap, catchError } from "rxjs/operators";

import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.baseUrl + "api/auth";
 isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
 userId: Pick<User, "id">

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json"}),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  getOne(userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${userId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<any>('getOne'))
      );
  }

  signup(user: Omit<User, "id">): Observable<User>{
    return this.http
    .post<User>(`${this.url}/signup`, user, this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    );
  }

  login(email: Pick<User, "email">, password: Pick<User, "password">): Observable<{
    token: string; userId: Pick<User, "id">
  }> {
    return this.http
    .post(`${this.url}/login`, { email ,password }, this.httpOptions)
    .pipe(
      first(),
      tap((tokenObject: { token: string; userId: Pick<User, "id">}) => {
        this.userId = tokenObject.userId;
        localStorage.setItem("token", tokenObject.token);
        if (tokenObject.token) {
          this.isUserLoggedIn$.next(true);
          this.router.navigate([""]);
        } else {
          this.isUserLoggedIn$.next(false);
          this.router.navigate(["login"]);
        }
      
      }),
      catchError(this.errorHandlerService.handleError<{
        token: string; userId: Pick<User, "id">
      }>("login"))
    );
  }

  delete(userId: number): Observable<any>{
    console.log("in http:");
    console.log(userId);
    return this.http
    .delete<any>(`${this.url}/${userId}`, this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<any>("delete"))
    );
  }
}

