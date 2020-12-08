import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<Observable<string>> {

  constructor(
    private eventService: EventService,
    private authService: AuthService) { }

  resolve() {
    const userId = this.authService.userId;
    //const userId = 10; 
    return this.eventService.getAll(+userId);
  }
}