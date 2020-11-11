import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../shared/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-item-edit',
  templateUrl: './recipe-item-edit.component.html',
  styleUrls: ['./recipe-item-edit.component.css']
})
export class RecipeItemEditComponent implements OnInit {
  thisRecipe: Recipe = new Recipe('Mashed Potatoes', [
    new Ingredient('russet potatoes', 3, ''), 
    new Ingredient('butter', .5, 'cup'),
    new Ingredient('sour cream', 4, 'ounces'),
    new Ingredient('salt', 1, 'tablespoon')], 
   'Boil potatoes for 30 minutes. Mash with fork. Add butter with sour cream and salt to taste.', 4);

   addIngredient() {
    this.thisRecipe.ingredients.push({
      name: '',
      unit: '',
      quantity: 0,
    });
  }

  constructor() { }

  ngOnInit(): void {
  }

}
