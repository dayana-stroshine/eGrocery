import { Recipe } from './models/recipe.model';

export class Meal {
  public name: string;
  public recipes: Recipe[];

  constructor(name: string, recipes: Recipe[]) {
    this.name = name;
    this.recipes = recipes;
  }
}