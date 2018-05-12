import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap'

interface User{
  uid: string;
  email: string;
  photoURL?:string;
  displayName?:string;
  favoriteColor?:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(public afAuth: AngularFireAuth) {

   }

  login(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }
  logout(){
    this.afAuth.auth.signOut();
  }

}
