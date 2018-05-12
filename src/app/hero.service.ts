import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
// import { HEROES } from './mock-heroes'
import { Hero } from './hero';
import { MessageService } from './message.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/map'
import { AuthService } from './core/auth.service';

@Injectable({ providedIn: 'root' })
export class HeroService {

  
  private HeroCollection: AngularFirestoreCollection<Hero>;
  heroes : Observable<any>;
  hero : any
  name : string;
  id : number;
  info : string;
  img : string;

  constructor(
    private afs: AngularFirestore,
    private messageService: MessageService,
    private auth : AuthService) { 
      this.HeroCollection = afs.collection('hero');
    }


    // This is how you use snapshotChanges() in Firestore 'Collection'
  getHeroes(): Observable<any> {
    this.messageService.add('HeroService: fetched heroes');
    // this.heroes = this.HeroCollection.valueChanges()
    this.heroes = this.HeroCollection.snapshotChanges()
    .map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Hero;
        const id = a.payload.doc.id;
        return {id, data};
      })
    })
    console.log(this.heroes);
    return this.heroes;
  }


  /* This is how you use snapshotChanges() in firestore 'Document!' */
  getHero(id: number){
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    // this.heroes = this.afs.collection('hero',ref => ref.where('id','==',id)).valueChanges();
    this.hero = this.afs.collection("hero").doc(""+id).snapshotChanges()
    .map(a=>{
        const data = a.payload.data() as Hero;
        const id = a.payload.id;
        return {id, data};
      })
    return this.hero;
  }

  addHero(hero:Hero){
    this.HeroCollection.doc(""+hero.id).set({
      name : hero.name,
      info: hero.info,
      img : hero.img
    });
  }

  updateHero(hero){
    this.HeroCollection.doc(hero.id).set({
      name : hero.data.name,
      info : hero.data.info,
      img : hero.data.img
    })
  }

  deleteHero(hero){
    this.HeroCollection.doc(hero.id).delete();
  }
  
  clickLike(h){
    this.afs.collection('user').doc(""+ this.auth.afAuth.auth.currentUser.uid).collection('like').add({
      hero : h.data.name,
      date : new Date().toString()
    })
  }
}
