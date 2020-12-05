import { Component, OnInit } from '@angular/core';

import { RecipeHttpService } from '../shared/services/recipe.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../shared/services/meal.service';
import { Meal } from '../shared/models/meal.model';
import { Recipe } from '../shared/models/recipe.model';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  mealSelected: Meal;
  meals: Meal[];
  allRecipes: any;
  userId: Pick<User, "id">;
  isAuthenticated = false;

  constructor(
    private mealService: MealService,
    private router: Router,
    private recipeHttpService: RecipeHttpService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.allRecipes = this.activeRoute.snapshot.data.message[0];

    this.userId = this.authService.userId;
    
    this.mealService.resetMeals();
    this.mealService.mealSelected = this.mealService.meals[0];

    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    })

    for (const currentRecipe of this.allRecipes) {
      if (currentRecipe.category === 'breakfast') {
        this.mealService.meals[0].recipes.push(
          new Recipe(
            currentRecipe.recipe_name, 
            currentRecipe.category,
            [], 
            currentRecipe.instruction, 
            currentRecipe.satisfaction,
            currentRecipe.recipe_id
          )
        );
      } else if (currentRecipe.category === 'lunch') {
        this.mealService.meals[1].recipes.push(
          new Recipe(
            currentRecipe.recipe_name,
            currentRecipe.category, 
            [], 
            currentRecipe.instruction, 
            currentRecipe.satisfaction,
            currentRecipe.recipe_id
          )
        );
      } else if (currentRecipe.category === 'dinner') {
        this.mealService.meals[2].recipes.push(
          new Recipe(
            currentRecipe.recipe_name, 
            currentRecipe.category,
            [], 
            currentRecipe.instruction, 
            currentRecipe.satisfaction,
            currentRecipe.recipe_id
          )
        );
      } else if (currentRecipe.category === 'dessert') {
        this.mealService.meals[3].recipes.push(
          new Recipe(
            currentRecipe.recipe_name, 
            currentRecipe.category,
            [], 
            currentRecipe.instruction, 
            currentRecipe.satisfaction,
            currentRecipe.recipe_id
          )
        );
      } else {
        console.error(`Missing category or invalid currentRecipe: ${currentRecipe}`);
      }
    }

    this.meals = this.mealService.getMeals();
    this.mealSelected = this.mealService.mealSelected;
  }

  recipeSelected(recipe: Recipe) {
    // this.recipeService.recipeSelected = recipe;
    this.router.navigate(['/recipe-item', recipe.recipeId]);

  }

  onMealSelect(idx: number){
    this.mealSelected = this.meals[idx];
  }
}

/*

--- Raw Data Output from Recipes.getAll() ---

(2) [Array(11), Array(6)]
0: Array(11)
0: {recipe_id: 100, recipe_name: "Cereal", instruction: "Pour cereal and milk into bowl", category: "breakfast", satisfaction: 3, …}
1: {recipe_id: 101, recipe_name: "Eggs", instruction: "Scramble eggs in bowl and mix with milk and salt", category: "breakfast", satisfaction: 4, …}
2: {recipe_id: 102, recipe_name: "Toast", instruction: "Toast bread then smear butter or jam on it", category: "breakfast", satisfaction: 5, …}
3: {recipe_id: 103, recipe_name: "BLT", instruction: "Toast bread, add bacon, lettuce, tomato and mayo", category: "lunch", satisfaction: 5, …}
4: {recipe_id: 104, recipe_name: "Cheeseburger", instruction: "Cook ground beef in patty form, place on bun with cheese and other toppings", category: "lunch", satisfaction: 5, …}
5: {recipe_id: 105, recipe_name: "Salad", instruction: "Mix green and toppings then dress with salad dressing and croutons", category: "lunch", satisfaction: 2, …}
6: {recipe_id: 106, recipe_name: "Spaghetti", instruction: "Boil pasta then top with sauce and cheese", category: "dinner", satisfaction: 4, …}
7: {recipe_id: 107, recipe_name: "Steak and potatoes", instruction: "Sear steak in pan and roast potatoes", category: "dinner", satisfaction: 5, …}
8: {recipe_id: 108, recipe_name: "Mac n' Cheese", instruction: "Boil macaroni then mix with cheese sauce", category: "dinner", satisfaction: 5, …}
9: {recipe_id: 109, recipe_name: "Ice cream", instruction: "Mix and freeze cream", category: "dessert", satisfaction: 5, …}
10: {recipe_id: 110, recipe_name: "Cake", instruction: "Bake cake batter", category: "dessert", satisfaction: 5, …}
length: 11
__proto__: Array(0)
1: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
length: 2
__proto__: Array(0)

*/
