import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { RecipeService } from 'src/app/recipe.service';
import { IngredientHttpService } from '../../shared/services/ingredient.service';
import { RecipeHttpService } from '../../shared/services/recipe.service'
import { Recipe } from '../../shared/models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-item-add',
  templateUrl: './recipe-item-add.component.html',
  styleUrls: ['./recipe-item-add.component.css']
})
export class RecipeItemAddComponent implements OnInit {

  newRecipe: Recipe;
  public recipeForm: FormGroup;
  public IngredientList: FormArray;

  get ingredientFormGroup() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  // get the formgroup under contacts form array
  getIngredientFormGroup(index): FormGroup {
    // this.IngredientList = this.form.get('ingredients') as FormArray;
    const formGroup = this.IngredientList.controls[index] as FormGroup;
    return formGroup;
  }

  constructor(
    private recipeService: RecipeService,
    private recipeHttpService: RecipeHttpService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newRecipe = this.recipeService.recipeSelected;
    // this.recipeForm = this.createFormGroup();
    this.recipeForm = this.fb.group({
      recipeName: ['', Validators.compose([Validators.required])],
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
      name: [null]
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
  // method triggered when form is submitted
  //  submit() {
  //   console.log(this.recipeForm.value);
  // }
  // Makes an Http call
  submit(): void {
    // this.IngredientList.controls.forEach((element, index) => {
    //     console.log(element.value);
    // })
    // console.log(this.recipeForm.get('ingredients').value);
    this.recipeHttpService.addRecipe(this.recipeForm.value).subscribe((msg) => console.log(msg));
  }
}


