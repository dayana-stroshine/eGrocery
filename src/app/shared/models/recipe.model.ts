import { Ingredient } from "./ingredient.model";

export class Recipe {
  public name: string;
  public category: string;
  public ingredients: Ingredient[];
  public directions: string;
  public rating: number;
  public recipeId: number;

  constructor(name: string, category: string, ingredients: Ingredient[], directions: string, rating: number, recipeId: number) {
    this.name = name;
    this.category = category;
    this.ingredients = ingredients;
    this.directions = directions;
    this.rating = rating;
    this.recipeId = recipeId;
  }
}