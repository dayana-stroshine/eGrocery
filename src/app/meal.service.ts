import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './shared/ingredient.model';

import { Meal } from './shared/meal.model';
import { Recipe } from './shared/recipe.model';

@Injectable()
export class MealService {
  mealSelected = new EventEmitter<Meal>();

  private meals: Meal[] = [
    new Meal(
      'Breakfast',
      [
        new Recipe(
          'Mashed Potatoes', 
          [
            new Ingredient('russet potatoes', 3, ''),
            new Ingredient('butter', .5, 'cup'),
            new Ingredient('sour cream', 4, 'ounces'),
            new Ingredient('salt', 1, 'tablespoon')
          ],
          'Boil potatoes for 30 minutes. Mash with fork. Add butter with sour cream and salt to taste.',
          4
        )
      ]
    )
  ];

  constructor() { }

}


/*

import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}

*/