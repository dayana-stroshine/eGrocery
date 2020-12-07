import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/models/User';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.activeRoute.snapshot.data.message[0][0];
  }

  delete(): void {
    console.log("in header component:");
    console.log(this.user.user_id);
    this.authService.delete(+this.user.user_id).subscribe((msg) => {
      console.log(msg);
      localStorage.removeItem("token");
      this.authService.isUserLoggedIn$.next(false);
      this.router.navigate([""]);
    });
  }

}
