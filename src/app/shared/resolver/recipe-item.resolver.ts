import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { RecipeHttpService } from '../services/recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeItemResolver implements Resolve<Observable<string>> {

  constructor(private recipeHttpService: RecipeHttpService) { }

  resolve() {
    // Get the recipeId from recipe service to make the API call
    const recipeId = this.recipeHttpService.recipeSelected.recipeId;
    return this.recipeHttpService.getOne(recipeId);
  }
}