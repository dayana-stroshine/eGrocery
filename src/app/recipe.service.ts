import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './shared/ingredient.model';

import { Recipe } from './shared/recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipeSelected: Recipe;

  private recipes: Recipe[] = [];

  constructor() { }

}