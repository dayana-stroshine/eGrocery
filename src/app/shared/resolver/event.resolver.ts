import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { EventService } from '../services/event.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<Observable<string>> {

  constructor(private eventService: EventService) { }

  resolve() {
    const userId = 10; // could be replaced with a user service that has current user
    return this.eventService.getAll(userId);
  }
}