import { Injectable } from '@angular/core';
import { Recipe } from './shared/models/recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipeSelected: Recipe;


  constructor() { }

}