
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeItemEditComponent } from './recipes/recipe-item-edit/recipe-item-edit.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: KitchenComponent },
  ] },
  { path: 'kitchen', component: KitchenComponent },
  { path: 'grocery-list', component: GroceryListComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'recipe-edit', component: RecipeItemEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}