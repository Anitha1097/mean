import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthServices } from "../auth/auth.service";
import { Router } from "@angular/router";
import {
  AuthService,
  GoogleLoginProvider,FacebookLoginProvider,
  SocialUser,
} from 'angularx-social-login';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  socialUserIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private socialAuthListenerSubs: Subscription;

  constructor(private authService: AuthServices, private socialAuthService: AuthService,  private router: Router) { }
  ngOnInit() {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.socialAuthListenerSubs = this.authService
      .getSocialAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.socialUserIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  googleLogout(){
    this.socialAuthService.signOut().then((data) => {
      this.authService.logout();
    }).catch((data) => {
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}