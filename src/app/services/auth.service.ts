import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = null;
  public user$: BehaviorSubject<any> = new BehaviorSubject<any>(this.user);

  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              private toastr: ToastrService,
              private router: Router) {

    const loginCache = localStorage.getItem('user');
    if (loginCache) {
      this.user = JSON.parse(loginCache);
      this.user$.next(this.user);
    }
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.user = user;
            this.user$.next(this.user);
            localStorage.setItem('user', JSON.stringify(this.user));
            this.toastr.success('Logged in successfully');
            this.router.navigate(['/']);
          }
        });
      })
      .catch((error) => {
        // console.log(error.message);
        this.toastr.error("Username or password is incorrect");
      });
  }

  LogOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.user = null;
      this.user$.next(this.user);
      this.toastr.success('Logged out successfully');
    });
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }


}
