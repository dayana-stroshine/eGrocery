import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IngredientHttpService } from '../../shared/services/ingredient.service';
import { RecipeHttpService } from '../../shared/services/recipe.service'
import { Recipe } from '../../shared/models/recipe.model';

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

  // get the formgroup under ingredients form array
  getIngredientFormGroup(index): FormGroup {
    // this.IngredientList = this.form.get('ingredients') as FormArray;
    const formGroup = this.IngredientList.controls[index] as FormGroup;
    return formGroup;
  }

  constructor(
    private recipeHttpService: RecipeHttpService,
    private ingredientHttpService: IngredientHttpService,
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

  // Makes an Http call
  submit(): void {
    // addRecipe
    console.log(this.recipeForm.value)
    this.recipeHttpService.addRecipe(this.recipeForm.value).subscribe((msg) => console.log(msg));
    // Add Ingredients 
    this.IngredientList.controls.forEach((element, index) => {
      this.ingredientHttpService.addIngredient(element.value).subscribe((msg => console.log(msg)))
    })



    // HOT MESS BELOW, FIX ME ADD RECIPE INGREDIENTS

    // const addRecipe$ = this.recipeHttpService.addRecipe(this.recipeForm.value);


    // const addIngredient$ = addRecipe$.switchMap(
    // )
    // addIngredient$.subscribe(
    //   console.log,
    //   console.error,
    //   () => console.log ('completed adding recipe')
    // )
    //     const course$ = simulateHttp({id:1, description: 'Angular For Beginners'}, 1000);

    // const httpResult$ = course$.switchMap(
    //     courses => simulateHttp([], 2000),
    //     (courses, lessons, outerIndex, innerIndex) => [courses, lessons] );

    // httpResult$.subscribe(
    //     console.log,
    //     console.error,
    //     () => console.log('completed httpResult$')
    // );
  }
}


