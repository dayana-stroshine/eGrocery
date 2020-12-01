import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { IngredientHttpService } from '../../shared/services/ingredient.service';
import { Recipe } from '../../shared/models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import { RecipeHttpService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-item-edit',
  templateUrl: './recipe-item-edit.component.html',
  styleUrls: ['./recipe-item-edit.component.css']
})

export class RecipeItemEditComponent implements OnInit {
  // thisRecipe: Recipe;
  public recipeForm: FormGroup;
  public IngredientList: FormArray;
  public id: number;

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
    private router: Router,
    private route: ActivatedRoute,
    private recipeHttpService: RecipeHttpService,
    private ingredientHttpService: IngredientHttpService,

    private fb: FormBuilder) { }

  ngOnInit(): void {

    // this.thisRecipe = this.recipeHttpService.recipeSelected;
    // this.recipeForm = this.createFormGroup();
    this.recipeForm = this.fb.group({
      recipeName: ['', Validators.compose([Validators.required])],
      recipeCategory: [''],
      ingredients: this.fb.array([this.createIngredient()]),
      directions: ['']
    });

    this.IngredientList = this.recipeForm.get('ingredients') as FormArray;

    this.id = +this.route.snapshot.paramMap.get('id');

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
        category: ingrd.category,
        id: ingrd.ingredient_id,
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
      category: [null],
      id: [null]
    });


  }

  // add ingredient from group
  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.createIngredient());
  }

  // remove ingredient from group
  removeIngredient(index) {
    let ingredients = this.recipeForm.get('ingredients').value;
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    this.ingredientHttpService.deleteIngredient(ingredients[index].id).subscribe((msg => console.log(msg)))
  }

  // Makes an Http call
  submit(): void {
    // get recipe

    // update recipe

    // get ingredients

    // loop through ingredients returned from form,
    // if they have an ingredient id, update them
    
    
    // if not, add them to the recipe

    // // addRecipe
    // console.log(this.recipeForm.value)
    // this.recipeHttpService.addRecipe(this.recipeForm.value).subscribe((msg) => console.log(msg));
    // // Add Ingredients 
    // this.IngredientList.controls.forEach((element, index) => {
    //   this.ingredientHttpService.addIngredient(element.value).subscribe((msg => console.log(msg)))
    // })
  }

  removeRecipe(){
    let ingredients = this.recipeForm.get('ingredients').value;
    // Delete ingredients
    ingredients.forEach(ingredient =>
      {
        this.ingredientHttpService.deleteIngredient(ingredient.id).subscribe((msg => console.log(msg)))
      });
    // Delete recipe
    this.recipeHttpService.delete(this.id).subscribe((msg => console.log(msg)));
    this.router.navigate(['/recipes']);
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
        category: recipeItem[0].recipe_category,
        instruction: recipeItem[0].instruction,
        user_id: recipeItem[0].user_id,
        ingredients: []
      })
    }
  }
}