import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RecipeHttpService } from '../services/recipe.service';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Observable<string>> {
  userId: Pick<User, "id">;
  constructor(
    private recipeHttpService: RecipeHttpService,
    private authService : AuthService) { }

  resolve() {
    const userId = this.authService.userId;
    // if this is a users recipe library, populate it with their recipes
    if(userId){
      return this.recipeHttpService.getAll(+userId);
    }
    // otherwise just choose 4 recent recipes
    return this.recipeHttpService.getRandom(1);
  }
}