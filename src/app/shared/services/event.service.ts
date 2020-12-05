import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Ingredient } from '../models/ingredient.model';
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

  // populateCalendar(allIngredients: any[]) {
  //   this.currentKitchen = new Map();

  //   for (const currentIngredient of allIngredients) {
  //     const currentCategory: string = currentIngredient.category;

  //     if (this.currentKitchen.has(currentCategory)) {
  //       const tempIngredientList: Ingredient[] = this.currentKitchen.get(currentCategory).slice();

  //       tempIngredientList.push(
  //         new Ingredient(
  //           currentIngredient.ingredient_id,
  //           currentIngredient.ingredient_name,
  //           currentIngredient.quantity,
  //           currentIngredient.unit,
  //           currentIngredient.category
  //         )
  //       );

  //       this.currentKitchen.set(currentCategory, tempIngredientList.slice());
  //     } else {
  //       const newIngredientList: Ingredient[] = [
  //         new Ingredient(
  //           currentIngredient.ingredient_id,
  //           currentIngredient.ingredient_name,
  //           currentIngredient.quantity,
  //           currentIngredient.unit,
  //           currentIngredient.category
  //         )
  //       ];
  //       this.currentKitchen.set(currentCategory, newIngredientList.slice());
  //     }
  //   }
  // }
}