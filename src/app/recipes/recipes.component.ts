import { Component, OnInit } from '@angular/core';

import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { MealService } from '../meal.service';
import { Meal } from '../shared/meal.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  mealSelected: Meal;
  meals: Meal[];

  constructor(
    private mealService: MealService,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mealSelected = this.mealService.mealSelected;
    this.meals = this.mealService.getMeals();
  }

  recipeSelected(recipe: Recipe) {
    this.recipeService.recipeSelected = recipe;
    this.router.navigate(['recipe-item']);
  }

  onMealSelect(idx: number){
    this.mealSelected = this.meals[idx];
  }
}
