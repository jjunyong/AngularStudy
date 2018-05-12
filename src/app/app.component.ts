import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './core/auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  number;
  constructor(private afs:AngularFirestore,public auth:AuthService,
    private snackBar : MatSnackBar){
    afs.firestore.settings({timestampsInSnapshots : true})
  }

  logout(){
    this.snackBar.open(this.auth.afAuth.auth.currentUser.displayName+" logged out!","",{
      duration: 2000
    })
    this.auth.logout();
  }
}
