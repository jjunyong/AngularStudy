import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'
import { AuthService } from './core/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public afs: AngularFirestore,
  public auth : AuthService) { }

  getData(id){
    return this.afs.collection('user').doc(""+ id).collection('like').valueChanges()
  }
}
