import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { IngredientHttpService } from '../../shared/services/ingredient.service';
import { Recipe } from '../../shared/models/recipe.model';
import { Ingredient } from '../../shared/models/ingredient.model';
import { RecipeHttpService } from 'src/app/shared/services/recipe.service';
import { RecipeIngredientHttpService } from 'src/app/shared/services/recipe-ingredients.service';

@Component({
  selector: 'app-recipe-item-edit',
  templateUrl: './recipe-item-edit.component.html',
  styleUrls: ['./recipe-item-edit.component.css']
})

export class RecipeItemEditComponent implements OnInit {
  thisRecipe: Recipe;
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
    private recipeIngredientHttpService: RecipeIngredientHttpService,

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
    this.thisRecipe = this.formatRecipeItem(this.route.snapshot.data.message[0]);
    if (this.thisRecipe) {
      this.editRecipe(this.thisRecipe);
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
    // get recipe and ingredients
    const ingredientArray = this.recipeForm.value.ingredients;
    const recipeUpdate = {
      name: this.recipeForm.value.recipeName,
      category: this.recipeForm.value.recipeCategory,
      ingredients: [],
      directions: this.recipeForm.value.directions,
      rating: this.thisRecipe.rating, //FIX ME: include rating from form
      recipeId: this.id,
    }

    // update recipe
    this.recipeHttpService.update(recipeUpdate).subscribe((msg) => console.log(msg));

    let ingredientId:number;
    // loop through ingredients returned from form,
    // if they have an ingredient id, update them
    // else, add them to the recipe
    ingredientArray.forEach((element, index) => { 
      if (element.id != null ){
        //update
        this.ingredientHttpService.updateIngredient(element).subscribe((msg => console.log(msg)))
      } else if (element.name) {
        // add new ingredient and recipe/ingredient relation
        this.ingredientHttpService.addIngredient(element).subscribe(result => {
          ingredientId = result[0].insertId;
          this.submitRelation(this.id, ingredientId);
        })
      }
      })
      this.router.navigate(['/recipe-item', this.id]);
    }

// Helper function for submitting to Recipes_Ingredients table that relates an ingredient to a recipe
submitRelation(recipeId: number, ingredientId: number){
  const recipeIngredient = {
    recipe_id : recipeId,
    ingredient_id : ingredientId
  }
  this.recipeIngredientHttpService.addRIRelation(recipeIngredient).subscribe(msg => console.log(msg));
}

  removeRecipe() {
      let ingredients = this.recipeForm.get('ingredients').value;
      // Delete ingredients
      ingredients.forEach(ingredient => {
        this.ingredientHttpService.deleteIngredient(ingredient.id).subscribe((msg => console.log(msg)))
      });
      // Delete recipe
      this.recipeHttpService.delete(this.id).subscribe((msg => console.log(msg)));
      this.router.navigate(['/recipes']);
    }

  // Upon completion of GET call to API, the results are formatted so the page may be displayed
  formatRecipeItem(recipeItem) {
      if(recipeItem) {
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