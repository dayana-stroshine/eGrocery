import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IngredientHttpService } from '../../shared/services/ingredient.service';
import { RecipeHttpService } from '../../shared/services/recipe.service'
import { RecipeIngredientHttpService } from '../../shared/services/recipe-ingredients.service'
import { Recipe } from '../../shared/models/recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item-add',
  templateUrl: './recipe-item-add.component.html',
  styleUrls: ['./recipe-item-add.component.css']
})
export class RecipeItemAddComponent implements OnInit {
  recipeId: number;
  newRecipe: Recipe;
  public recipeForm: FormGroup;
  public IngredientList: FormArray;


  get ingredientFormGroup() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  // get the formgroup under ingredients form array
  getIngredientFormGroup(index): FormGroup {
    // this.IngredientList = this.form.get('ingredients') as FormArray;
    const formGroup = this.IngredientList.controls[index] as FormGroup;
    return formGroup;
  }

  constructor(
    private router: Router,
    private recipeHttpService: RecipeHttpService,
    private ingredientHttpService: IngredientHttpService,
    private recipeIngredientHttpService: RecipeIngredientHttpService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newRecipe = this.recipeHttpService.recipeSelected;
    // this.recipeForm = this.createFormGroup();
    this.recipeForm = this.fb.group({
      recipeName: ['', Validators.compose([Validators.required])],
      recipeCategory: [''],
      ingredients: this.fb.array([this.createIngredient()]),
      directions: ['']
    });

    this.IngredientList = this.recipeForm.get('ingredients') as FormArray;

  }

  // ingredient formgroup
  createIngredient(): FormGroup {
    return this.fb.group({
      quantity: [null],
      unit: [null],
      name: [null],
      category: [null]
    });
  }

  // add ingredient from group
  addIngredient() {
    this.IngredientList.push(this.createIngredient());
  }

  // remove ingredient from group
  removeIngredient(index) {
    this.IngredientList.removeAt(index);
  }

  // Helper function for submitting an ingredient
  submitIngredients(recipeId: number) {
      // Add Ingredients 
      let ingredientId:number;

      this.IngredientList.controls.forEach((element, index) => {
        this.ingredientHttpService.addIngredient(element.value).subscribe(result => {
          ingredientId = result[0].insertId;
          this.submitRelation(recipeId, ingredientId);
        })
      })
  } 

  // Helper function for submitting to Recipes_Ingredients table that relates an ingredient to a recipe
  submitRelation(recipeId: number, ingredientId: number){
    const recipeIngredient = {
      recipe_id : recipeId,
      ingredient_id : ingredientId
    }
    this.recipeIngredientHttpService.addRIRelation(recipeIngredient).subscribe(msg => console.log(msg));
    this.router.navigate(['/recipes']);
  }

  // Makes an Http call
  submit(): void {
    // addRecipe
    this.recipeHttpService.addRecipe(this.recipeForm.value).subscribe(results => {
      this.recipeId = results[0].insertId;

      this.submitIngredients(results[0].insertId);
    });
    
  }
}


