import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipesComponent } from './recipes/recipes.component';
import { HeaderComponent } from './header/header.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeItemEditComponent } from './recipes/recipe-item-edit/recipe-item-edit.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    HeaderComponent,
    GroceryListComponent,
    HomepageComponent,
    KitchenComponent,
    CalendarComponent,
    RecipeItemComponent,
    RecipeItemEditComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
