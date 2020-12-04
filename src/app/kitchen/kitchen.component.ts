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

  constructor(
    private activeRoute: ActivatedRoute,
    private kitchenService: KitchenService
  ) { }

  ngOnInit(): void {
    this.allIngredients = this.activeRoute.snapshot.data.message[0];
    this.kitchenService.populateKitchen(this.allIngredients.slice());
    this.categories =[ ...this.kitchenService.currentKitchen.keys() ];
    this.selectedCategory = this.categories[0];
    this.selectedCategoryIngredients = this.kitchenService.currentKitchen.get(this.categories[0]).slice();
  }

  onSelect(category: string) {
    this.selectedCategory = category;
    this.selectedCategoryIngredients = this.kitchenService.currentKitchen.get(category).slice();
  }
}
