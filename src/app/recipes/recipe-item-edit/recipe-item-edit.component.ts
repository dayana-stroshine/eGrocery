import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { IngredientHttpService } from '../../shared/services/ingredient.service';
import { RecipeHttpService } from '../../shared/services/recipe.service'
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from '../../shared/models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-item-edit',
  templateUrl: './recipe-item-edit.component.html',
  styleUrls: ['./recipe-item-edit.component.css']
})

export class RecipeItemEditComponent implements OnInit {
  thisRecipe: Recipe;
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
    private router: Router,
    private route: ActivatedRoute,
    private recipeHttpService: RecipeHttpService,
    private ingredientHttpService: IngredientHttpService,

    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.thisRecipe= this.recipeService.recipeSelected;
    console.log(this.thisRecipe);
    

    // this.recipeForm = this.createFormGroup();
    this.recipeForm = this.fb.group({
      recipeName: ['', Validators.compose([Validators.required])],
      recipeCategory: [''],
      ingredients: this.fb.array([this.createIngredient()]),
      directions: ['']
    });

    this.IngredientList = this.recipeForm.get('ingredients') as FormArray;
    
  }

  // bind ingredient form array data to ingredients
  editIngredient(recipe: Recipe){
    this.recipeForm.setControl('ingredients', this.setExistingIngredients(recipe.ingredients));
  }

  setExistingIngredients(ingredientSets: Ingredient[]): FormArray {
    const formArray = new FormArray([]);
    ingredientSets.forEach( ingrd => {
      formArray.push(this.fb.group({
        quantity: ingrd.quantity,
        unit: ingrd.unit,
        name: ingrd.name,
        category: ingrd.category
      }));
    });

    return formArray;
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
    // // addRecipe
    // console.log(this.recipeForm.value)
    // this.recipeHttpService.addRecipe(this.recipeForm.value).subscribe((msg) => console.log(msg));
    // // Add Ingredients 
    // this.IngredientList.controls.forEach((element, index) => {
    //   this.ingredientHttpService.addIngredient(element.value).subscribe((msg => console.log(msg)))
    // })
  }
  // getIngredientFormGroup(index): FormGroup {
  //   const formGroup = this.IngredientList.controls[index] as FormGroup;
  //   return formGroup;
  // }

  // createFormGroup(): FormGroup {
  //   return new FormGroup ({
  //     recipeName: new FormControl("", []),
  //     email: new FormControl("", []),
  //     password: new FormControl("", [Validators.required, Validators.minLength(7)])

  //   })
  // }
}
