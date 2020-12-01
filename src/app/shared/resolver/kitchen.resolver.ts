import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { KitchenService } from '../services/kitchen.service';

@Injectable({
  providedIn: 'root'
})
export class KitchenResolver implements Resolve<Observable<string>> {

  constructor(private kitchenService: KitchenService) { }

  resolve() {
    const userId = 10; // could be replaced with a user service that has current user
    return this.kitchenService.getAll(userId);
  }
}