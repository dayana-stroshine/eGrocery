
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeItemEditComponent } from './recipes/recipe-item-edit/recipe-item-edit.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeItemAddComponent } from './recipes/recipe-item-add/recipe-item-add.component';

import { RecipeResolver } from './shared/resolver/recipe.resolver';
import { RecipeItemResolver } from './shared/resolver/recipe-item.resolver';
import { KitchenResolver } from './shared/resolver/kitchen.resolver';
import { HomepageResolver } from './shared/resolver/homepage.resolver';

import { AuthGuardService } from "./shared/services/auth-guard.service";

const appRoutes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full', resolve: { message: HomepageResolver } },
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuardService], resolve: { message: RecipeResolver } },
  { path: 'kitchen', component: KitchenComponent, resolve: { message: KitchenResolver } },
  { path: 'grocery-list', component: GroceryListComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'recipe-item/:id', component: RecipeItemComponent, resolve: { message: RecipeItemResolver } },
  { path: 'recipe-edit/:id', component: RecipeItemEditComponent, resolve: { message: RecipeItemResolver } },
  { path: 'recipe-add', component: RecipeItemAddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}