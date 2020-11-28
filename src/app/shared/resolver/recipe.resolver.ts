import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { RecipeHttpService } from '../services/recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Observable<string>> {
  
  constructor(private recipeHttpService: RecipeHttpService) {}

  resolve() {
    const userId = 10; // could be replaced with a user service that has current user
    return this.recipeHttpService.getAll(userId);
  }
}