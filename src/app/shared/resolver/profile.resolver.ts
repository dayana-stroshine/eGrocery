import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<Observable<string>> {
  constructor(
    private authService : AuthService) { }

    // Reads from the user table by id to get user information for the header component
  resolve() {
    const userId = +this.authService.userId;

    return this.authService.getOne(userId);
    
  }
}