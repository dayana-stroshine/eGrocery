import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
// no need to async or unsubscribe with first
import { catchError, first } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeHttpService {
  recipeSelected: Recipe;
  private url = environment.baseUrl + "api/recipe";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  addRecipe(recipe: Omit<Recipe, "id">): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.url}/addRecipe`, recipe, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Recipe>('addRecipe'))
      );
  }

  getAll(userId: number):  Observable<any> {
    return this.http.get<any>(`${this.url}/${userId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<any>('getAll'))
      );
  }

  getOne(recipeId: number):  Observable<any> {
    return this.http.get<any>(`${this.url}/getOne/${recipeId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<any>('getOne'))
      );
  }

  delete(recipeId: number):  Observable<any> {
    return this.http.delete<any>(`${this.url}/${recipeId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<any>('delete'))
      );
  }
  

}



