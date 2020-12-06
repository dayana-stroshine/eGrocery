import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from '../shared/models/ingredient.model';

import { KitchenService } from '../shared/services/kitchen.service';

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

  constructor(
    private activeRoute: ActivatedRoute,
    private kitchenService: KitchenService
  ) { }

  ngOnInit(): void {
    this.allIngredients = this.activeRoute.snapshot.data.message[0];
    console.log(this.allIngredients);
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
}
