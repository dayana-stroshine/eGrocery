import { Component, OnInit } from '@angular/core';

import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  testRecipe: Recipe = new Recipe(
    'Mashed Potatoes', [
      new Ingredient('russet potatoes', 3, ''),
      new Ingredient('butter', .5, 'cup'),
      new Ingredient('sour cream', 4, 'ounces'),
      new Ingredient('salt', 1, 'tablespoon')
    ],
    'Boil potatoes for 30 minutes. Mash with fork. Add butter with sour cream and salt to taste.', 
    4
  );

  constructor() { }

  ngOnInit(): void {
  }

  mealSelected(mealType: string) {
    
  }
}
