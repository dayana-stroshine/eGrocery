import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Ingredient } from '../shared/models/ingredient.model';
import { IngredientHttpService } from '../shared/services/ingredient.service';
import { KitchenService } from '../shared/services/kitchen.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  allIngredients: any;
  categories: string[];
  selectedCategoryIngredients: Ingredient[];
  selectedCategory: string;
  searchQuery: string = '';
  searchResult: string;
  userId: number;
  addIngredientForm = this.fb.group({
    quantity: [''],
    unit: [''],
    name: ['', Validators.compose([Validators.required])],
    category: ['']
  });

  constructor(
    private activeRoute: ActivatedRoute,
    private kitchenService: KitchenService,
    private fb: FormBuilder, 
    private authService: AuthService,
    private ingredientHttpService: IngredientHttpService
  ) { }

  ngOnInit(): void {
    this.allIngredients = this.activeRoute.snapshot.data.message[0];
    this.userId = +this.authService.userId;
    if (this.allIngredients.length > 0) {
      this.kitchenService.populateKitchen(this.allIngredients.slice());
      this.categories = [...this.kitchenService.currentKitchen.keys()];
      this.selectedCategory = this.categories[0];
      this.selectedCategoryIngredients = this.kitchenService.currentKitchen.get(this.categories[0]).slice();
    } else {
      this.searchResult = 'This kitchen is empty.';
    }

  }

  onSelect(category: string) {
    this.selectedCategory = category;
    this.selectedCategoryIngredients = this.kitchenService.currentKitchen.get(category).slice();
  }

  onSearch() {
    this.searchResult = '';
    if (this.allIngredients.length > 0) {
      for (const categoryKey of this.kitchenService.currentKitchen.keys()) {
        const ingredients = this.kitchenService.currentKitchen.get(categoryKey).slice();
        for (const ingredient of ingredients) {
          if (ingredient.name.includes(this.searchQuery)) {
            this.selectedCategory = categoryKey;
            this.selectedCategoryIngredients = ingredients.slice();
            return;
          }
        }
      }
    }
    this.searchResult = 'Nothing matches search query!';
    return;
  }

  addIngredient(): void {
    let ingredientId: number;

    console.log(this.addIngredientForm.value);
    this.ingredientHttpService.addIngredient(this.addIngredientForm.value).subscribe(result => {
      ingredientId = result[0].insertId;
      this.submitRelation(this.userId, ingredientId);
    });
  }

  submitRelation(userId: number, ingredientId: number) {
    const kitchenIngredient = {
      user_id: userId,
      ingredient_id: ingredientId
    }
    // add to Kitchens table
    this.kitchenService.addKitchenIngredient(kitchenIngredient).subscribe(msg => console.log(msg));
    // update UI here
   
    // reset form
    this.addIngredientForm.reset();
    
  }


}
