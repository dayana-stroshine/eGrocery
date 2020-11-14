import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './shared/ingredient.model';

import { Meal } from './shared/meal.model';
import { Recipe } from './shared/recipe.model';

@Injectable({providedIn: 'root'})
export class MealService {
  meals: Meal[] = [
    new Meal(
      'Breakfast',
      [
        new Recipe(
          'Cereal', 
          [
            new Ingredient('favorite cereal', 3, ''),
            new Ingredient('milk', .5, 'cup'),
            new Ingredient('fruit of choice', 4, 'ounces')
          ],
          'Pour cereal and fruit in bowl, pour milk over cereal',
          4
        ),
        new Recipe(
          'Scrambled Eggs', 
          [
            new Ingredient('eggs', 3, ''),
            new Ingredient('butter', .5, 'cup'),
            new Ingredient('salt', 1, 'tablespoon')
          ],
          'Scramble eggs in bowl, place butter in hot pan, pour eggs in pan and cook for 5 minutes.',
          4
        ),
        new Recipe(
          'Toast', 
          [
            new Ingredient('bread', 3, ''),
            new Ingredient('butter', .5, 'cup')
          ],
          'Put bread in toaster, when done butter the toast.',
          4
        )
      ]
    ),
    new Meal(
      'Lunch',
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
        ),
        new Recipe(
          'Hamburger', 
          [
            new Ingredient('buns', 3, ''),
            new Ingredient('ground beef', .5, 'cup'),
            new Ingredient('cheese', 4, 'ounces'),
            new Ingredient('salt', 1, 'tablespoon')
          ],
          'Pan fry ground beef for 3 minutes on each side, toast bun, put ground beef on bun after it is cooked.',
          4
        )
      ]
    ),
    new Meal(
      'Dinner',
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
        ),
        new Recipe(
          'Hamburger', 
          [
            new Ingredient('buns', 3, ''),
            new Ingredient('ground beef', .5, 'cup'),
            new Ingredient('cheese', 4, 'ounces'),
            new Ingredient('salt', 1, 'tablespoon')
          ],
          'Pan fry ground beef for 3 minutes on each side, toast bun, put ground beef on bun after it is cooked.',
          4
        ),
        new Recipe(
          'Salmon Entree w/ Broccoli', 
          [
            new Ingredient('salmon', 3, ''),
            new Ingredient('butter', .5, 'cup'),
            new Ingredient('broccoli', 4, 'ounces'),
            new Ingredient('salt', 1, 'tablespoon')
          ],
          'Steam salmon and broccoli for 10 minutes, season with salt and butter.',
          4
        )
      ]
    ),
    new Meal(
      'Dessert',
      [
        new Recipe(
          'Ice cream sundae', 
          [
            new Ingredient('ice cream', 3, ''),
            new Ingredient('hot fudge', .5, 'cup'),
            new Ingredient('cherries', 4, 'ounces')
          ],
          'Mix all ingredients together in bowl',
          4
        ),
        new Recipe(
          'Cookes', 
          [
            new Ingredient('cookie batter', 3, ''),
            new Ingredient('butter', .5, 'cup'),
            new Ingredient('eggs', 4, 'ounces')
          ],
          'Mix all ingredients and bake at 400 degree fahrenheit for 45 minutes.',
          4
        )
      ]
    )
  ];

  mealSelected: Meal = this.meals[0];

  constructor() { }

  getMeals() {
    return this.meals.slice();
  }
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