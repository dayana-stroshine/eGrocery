import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Attaches header to Http requests that will provide  authentication through checking for matching
// tokens in the browser local storage
export class AuthCompanionService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      })
      return next.handle(clonedRequest);

    } else {
      return next.handle(req);
    }
  }

  constructor() { }
}
