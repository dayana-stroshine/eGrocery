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
    return this.recipeHttpService.getAll(+userId);
  }
}