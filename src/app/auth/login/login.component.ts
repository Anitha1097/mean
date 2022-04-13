import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthServices } from "../auth.service";
import {
  AuthService,
  GoogleLoginProvider, FacebookLoginProvider,
  SocialUser,
} from 'angularx-social-login';
// import { TwitterService } from 'ngx-twitter-api';
import { TwitterAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import * as auth from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription; type: any;
  result = '';
  constructor(public authService: AuthServices, private socialAuthService: AuthService, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }
  onLogin(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.type = 'login';
    this.authService.login(form.value.email, form.value.password, this.type);
    this.isLoading = false;
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.type = 'socialLogin';
      this.authService.login(user.email, 'pass', this.type);
    });
  }
  loginWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.type = 'socialLogin';
      this.authService.login(user.email, 'pass', this.type);
      console.log(user);
    });
  }

  loginWithTwitter() {
    //   this.twitter.get(
    //     'https://api.twitter.com/1.1/statuses/home_timeline.json',
    //     {
    //       count: 5
    //     },
    //     {
    //       consumerKey: '9qjiWhWb17zBwEyqE13XC6edU',
    //       consumerSecret: 'GIoItw7Vd9frXdjfc9vrx6b0Db4CutEjiUdUcLHrQIqxLLuotX'
    //     },
    //     {
    //       token: '1172146651034611712-aAN6WTADaqx8EfHQt26XHuC0GwC5c4',
    //       tokenSecret: 'WRkL1JLxiw7atyeVJTV1fz2mxwT9fJBk3bm78M8W1gDTd'
    //     }
    // ).subscribe((res:Response)=>{
    //   console.log(res);
    //     // this.result = res.json().map(tweet => tweet.text);
    // });
  }

  twitterAuth() {
    // this.afAuth.signInWithPopup(new auth.TwitterAuthProvider());
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     console.log('Success');
    //   }
    // });
    return this.AuthLogin(new TwitterAuthProvider());
  }
  AuthLogin(provider: any) {
    this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
