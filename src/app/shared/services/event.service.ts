import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  daySelected: Event;
  currentCalendar: Map<string, string[]>;
  private url = `${environment.baseUrl}api/event`;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getAll(userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${userId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<any>('getAll'))
      );
  }

  addEventRecipe(recipe_id: number, user_id: number, day: string) {
    const reqBody = {
      recipe_id,
      user_id,
      day
    }
    return this.http.post<any>(`${this.url}/addEventRecipe`, reqBody, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<any>('addEventRecipe'))
      );
  }

  populateCalendar(allEventRecipes: Event[]) {
    this.currentCalendar = new Map();

    for (const eventRecipe of allEventRecipes) {
      const day: string = eventRecipe.date.toLowerCase();

      if (this.currentCalendar.has(day)) {
        const tempRecipeList: string[] = this.currentCalendar.get(day).slice();
        tempRecipeList.push(eventRecipe.recipe_name);
        this.currentCalendar.set(day, tempRecipeList.slice());
      } else {
        const newRecipeList = [eventRecipe.recipe_name];
        this.currentCalendar.set(day, newRecipeList.slice());
      }
    }
  }
}
