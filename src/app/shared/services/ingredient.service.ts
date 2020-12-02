import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Ingredient } from '../models/Ingredient'
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
// no need to async or unsubscribe with first
import { catchError, first } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientHttpService {
  private url = environment.baseUrl + "api/ingredient";
  // private url = "http://localhost:4100/api/ingredient/addIngredient";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  addIngredient(ingredient: Omit<Ingredient, "id">): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.url}/addIngredient`, ingredient, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Ingredient>('addIngredient'))
      );
  }

  updateIngredient(ingredient: Ingredient ): Observable<Ingredient> {
    return this.http.patch<Ingredient>(`${this.url}/${ingredient.id}`, ingredient, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Ingredient>('updateIngredient'))
      );
  }

  deleteIngredient(ingredientId:number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${ingredientId}`, this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<any>('deleteIngredient'))
    )
  }
}
