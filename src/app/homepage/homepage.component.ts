import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  newRecipes = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.newRecipes = this.activeRoute.snapshot.data.message[0];
  }

  goToRecipe(recipeId: number) {
    this.router.navigate(['/recipe-item', recipeId]);
  }

}
