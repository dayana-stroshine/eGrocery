import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';

import { RecipeIngredient } from '../models/RecipeIngredient'
import { Observable } from 'rxjs';
// no need to async or unsubscribe with first
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeIngredientHttpService {

  private url = environment.baseUrl + "api/recipeIngredient/";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

    addRIRelation(recipeIngredient: RecipeIngredient): Observable<RecipeIngredient> {
      return this.http.post<RecipeIngredient>(`${this.url}`, recipeIngredient, this.httpOptions)
        .pipe(
          first(),
          catchError(this.errorHandlerService.handleError<RecipeIngredient>('addRIRelation'))
        );
    }

    deleteRIRelation(recipeId: number, ingredientId:number): Observable<any> {
      return this.http.delete<any>(`${this.url}/${recipeId}/${ingredientId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<any>('deleteRIRelation'))
      )
    }

}
