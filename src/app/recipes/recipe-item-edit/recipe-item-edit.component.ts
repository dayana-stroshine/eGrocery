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
    this.thisRecipe = this.recipeService.recipeSelected;
    console.log(this.thisRecipe);


    // this.recipeForm = this.createFormGroup();
    this.recipeForm = this.fb.group({
      recipeName: ['', Validators.compose([Validators.required])],
      recipeCategory: [''],
      ingredients: this.fb.array([this.createIngredient()]),
      directions: ['']
    });

    this.IngredientList = this.recipeForm.get('ingredients') as FormArray;

    // Start of chain of events that gets the recipe based on the param id
    this.route.paramMap.subscribe(params => {
      const recipeId = +params.get('id');
      if (recipeId) {
        this.getRecipe(this.route);
      }
    })

  }
// Next step in the chain will get the recipe and then append it to the form
  getRecipe(route: ActivatedRoute) {
    const recipe = this.formatRecipeItem(this.route.snapshot.data.message[0]);
    console.log(recipe);
    if (recipe) {
      this.editRecipe(recipe);
    }
  }

  editRecipe(recipe) {
    this.recipeForm.patchValue({
      recipeName: recipe.recipe_name,
      recipeCategory: recipe.category,
      directions: recipe.instruction
    });
    this.recipeForm.setControl('ingredients', this.setExistingIngredients(recipe.ingredients))
  }

  // bind ingredient form array data to ingredients
  editIngredient(recipe: Recipe) {
    this.recipeForm.setControl('ingredients', this.setExistingIngredients(recipe.ingredients));
  }
  // setExistingIngredients(ingredientSets: Ingredient[]): FormArray {
  setExistingIngredients(ingredientSets): FormArray {
    const formArray = new FormArray([]);
    ingredientSets.forEach(ingrd => {
      formArray.push(this.fb.group({
        quantity: ingrd.quantity,
        unit: ingrd.unit,
        name: ingrd.ingredient_name,
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
  // Upon completion of GET call to API, the results are formatted so the page may be displayed
  formatRecipeItem(recipeItem) {
    console.log(recipeItem)
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
        category: recipeItem[0].recipe_category,
        instruction: recipeItem[0].instruction,
        user_id: recipeItem[0].user_id,
        ingredients: []
      })
    }
  }
}