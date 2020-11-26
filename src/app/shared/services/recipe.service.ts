import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Recipe } from '../models/Recipe'
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
// no need to async or unsubscribe with first
import { catchError, first } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeHttpService {
  private url = environment.baseUrl + "api/recipe/addRecipe";
  // private url = "http://localhost:4100/api/recipe/addRecipe";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  addRecipe(recipe: Omit<Recipe, "id">): Observable<Recipe> {
    return this.http.post<Recipe>(this.url, recipe, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Recipe>('addRecipe'))
      );
  }

//   getAll():  Observable<Recipe> {
//     return this.http.get<Recipe>(this.url, this.httpOptions)
//       .pipe(
//         first(),
//         catchError(this.errorHandlerService.handleError<Recipe>('getAll'))
//       );
//   }
}

