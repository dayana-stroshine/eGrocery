import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  ingredientSelected: Ingredient;
  currentKitchen: Map<string, Ingredient[]>;
  private url = `${environment.baseUrl}api/kitchen`;

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

  populateKitchen(allIngredients: any[]) {
    this.currentKitchen = new Map();

    for (const currentIngredient of allIngredients) {
      const currentCategory: string = currentIngredient.category;

      if (this.currentKitchen.has(currentCategory)) {
        const tempIngredientList: Ingredient[] = this.currentKitchen.get(currentCategory).slice();

        tempIngredientList.push(
          new Ingredient(
            currentIngredient.ingredient_name,
            currentIngredient.quantity,
            currentIngredient.unit
          )
        );

        this.currentKitchen.set(currentCategory, tempIngredientList.slice());
      } else {
        const newIngredientList: Ingredient[] = [
          new Ingredient(
            currentIngredient.ingredient_name,
            currentIngredient.quantity,
            currentIngredient.unit
          )
        ];
        this.currentKitchen.set(currentCategory, newIngredientList.slice());
      }
    }
  }
}