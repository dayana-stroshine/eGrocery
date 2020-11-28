import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { RecipeHttpService } from '../services/recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeItemResolver implements Resolve<Observable<string>> {
  
  constructor(private recipeHttpService: RecipeHttpService) {}

  resolve() {
    const recipeId = 100; // replace with recipe service
    return this.recipeHttpService.getOne(recipeId);
  }
}