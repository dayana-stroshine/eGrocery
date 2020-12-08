import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/models/User';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  public userId: Pick<User, "id">;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.userId = this.authService.userId;

    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    })
  }

  logout(): void {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);

  }

}
