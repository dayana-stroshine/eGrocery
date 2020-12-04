import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { RecipeHttpService } from '../services/recipe.service';

@Injectable({
    providedIn: 'root'
})
export class HomepageResolver implements Resolve<Observable<string>> {

    constructor(private recipeHttpService: RecipeHttpService) { }

    resolve() {
        // get Rondom gets the 4 newest recipes that aren't by the user specified. 
        const userId = 1;
        return this.recipeHttpService.getRandom(userId);
    }
}