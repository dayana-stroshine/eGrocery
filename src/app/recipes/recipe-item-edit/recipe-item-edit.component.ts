import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from '../../shared/models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-item-edit',
  templateUrl: './recipe-item-edit.component.html',
  styleUrls: ['./recipe-item-edit.component.css']
})

export class RecipeItemEditComponent implements OnInit {
  // thisRecipe: Recipe = new Recipe('Mashed Potatoes', [
  //   new Ingredient('russet potatoes', 3, ''), 
  //   new Ingredient('butter', .5, 'cup'),
  //   new Ingredient('sour cream', 4, 'ounces'),
  //   new Ingredient('salt', 1, 'tablespoon')], 
  //  'Boil potatoes for 30 minutes. Mash with fork. Add butter with sour cream and salt to taste.', 4);

  //  addIngredient() {
  //   this.thisRecipe.ingredients.push({
  //     name: '',
  //     unit: '',
  //     quantity: 0,
  //   });
  // }
  thisRecipe: Recipe;
  public recipeForm: FormGroup;
  public IngredientList: FormArray;

  get ingredientFormGroup() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  constructor(    
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.thisRecipe= this.recipeService.recipeSelected;
    // this.recipeForm = this.createFormGroup();
    this.recipeForm = this.fb.group({
      recipeName: [this.thisRecipe.name, Validators.compose([Validators.required])],
      ingredients: this.fb.array([this.createIngredient()]),
      directions: [this.thisRecipe.directions]
    });
    
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
        name: ingrd.name
      }));
    });

    return formArray;
  }

   // ingredient formgroup
   createIngredient(): FormGroup {
    return this.fb.group({
      quantity: [null], 
      unit: [null], 
      name: [null]
    });
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
