import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { KitchenService } from '../services/kitchen.service';

@Injectable({
  providedIn: 'root'
})
export class KitchenResolver implements Resolve<Observable<string>> {

  constructor(
    private kitchenService: KitchenService,
    private authService: AuthService) { }

  resolve() {
    // could be replaced with a user service that has current user
    // const userId = 10; 
    const userId = this.authService.userId;
    return this.kitchenService.getAll(+userId);
  }
}