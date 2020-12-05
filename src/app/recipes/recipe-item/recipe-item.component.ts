import { Component, OnInit, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RecipeHttpService } from 'src/app/shared/services/recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  //@Input() myRecipe: Recipe;
  // myRecipe: Recipe;
  recipeItem: any;
  isAuthenticated = false;

  constructor(
    private recipeHttpService: RecipeHttpService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.myRecipe = this.recipeHttpService.recipeSelected;
    this.recipeItem = this.formatRecipeItem(this.activeRoute.snapshot.data.message[0]);

    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    })
  }

  goToEdit(recipeId: number): void {
    console.log(recipeId)
    console.log(this.recipeItem)
    // this.recipeService.recipeSelected = this.recipeItem;
    this.router.navigate(['/recipe-edit', recipeId]);

  }

  // Upon completion of GET call to API, the results are formatted so the page may be displayed
  formatRecipeItem(recipeItem) {
    if (recipeItem) {
      return recipeItem.reduce((recipe, curr) => {
            const newIngredient = {
                ingredient_id: curr.ingredient_id,
                ingredient_name: curr.ingredient_name,
                category: curr.category,
                quantity: curr.quantity,
                unit: curr.unit,
        }
        recipe.ingredients.push(newIngredient);
        return recipe;
    }, {
      recipe_id: recipeItem[0].recipe_id,
      recipe_name: recipeItem[0].recipe_name,
      satisfaction: recipeItem[0].satisfaction,
      // FIX ME
      // category: recipeItem[0].recipe_category,
      instruction: recipeItem[0].instruction,
      user_id: recipeItem[0].user_id,
      ingredients: []
    })
    }
  }

}
