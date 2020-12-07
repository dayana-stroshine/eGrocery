
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
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
import { ProfileResolver } from './shared/resolver/profile.resolver';
import { KitchenResolver } from './shared/resolver/kitchen.resolver';
import { HomepageResolver } from './shared/resolver/homepage.resolver';
import { AuthGuardService } from "./shared/services/auth-guard.service";
import { EventResolver } from './shared/resolver/event.resolver';
import { ProfileComponent } from './profile/profile.component';


const appRoutes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full', resolve: { message: HomepageResolver } },
  { path: 'recipes', component: RecipesComponent, resolve: { message: RecipeResolver } },
  { path: 'kitchen', component: KitchenComponent, canActivate: [AuthGuardService], resolve: { message: KitchenResolver } },
  { path: 'calendar', canActivate: [AuthGuardService], component: CalendarComponent, resolve: { message: EventResolver } },
  { path: 'recipe-item/:id', component: RecipeItemComponent, resolve: { message: RecipeItemResolver } },
  { path: 'recipe-edit/:id', canActivate: [AuthGuardService], component: RecipeItemEditComponent, resolve: { message: RecipeItemResolver } },
  { path: 'recipe-add', component: RecipeItemAddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent, resolve: { message: ProfileResolver } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}