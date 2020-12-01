import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { RecipeHttpService } from '../services/recipe.service';
import { RecipeService } from 'src/app/recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeItemResolver implements Resolve<Observable<string>> {

  constructor(
    private recipeHttpService: RecipeHttpService,
    private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot) {
    // Get the recipeId from recipe service to make the API call
    // const recipeId =this.recipeService.recipeSelected.recipeId; 

    // Get the recipeId from the route params
    return this.recipeHttpService.getOne(+route.paramMap.get('id'));
  }
}