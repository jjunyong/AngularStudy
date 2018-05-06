import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
// import { HEROES } from './mock-heroes'
import { Hero } from './hero';
import { MessageService } from './message.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/map'

@Injectable({ providedIn: 'root' })
export class HeroService {

  
  private HeroCollection: AngularFirestoreCollection<Hero>;
  heroes : Observable<any>;
  hero : Observable<any>;
  name : string;
  id : string;
  info : string;
  img : string;

  constructor(
    private afs: AngularFirestore,
    private messageService: MessageService) { 
      this.HeroCollection = afs.collection('hero');
    }
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

  getHero(id: number): Observable<Hero[]> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    // this.heroes = this.afs.collection('hero',ref => ref.where('id','==',id)).valueChanges();
    this.heroes = this.afs.collection('hero',ref => ref.where('id','==',id)).snapshotChanges()
      .map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Hero;
        const id = a.payload.doc.id;
        return {id, data};
      })
    })
    return this.heroes;
  }

  addHero(hero:Hero){
    this.HeroCollection.add({
      name : hero.name,
      id : hero.id,
      info: hero.info,
      img : hero.img
    });
  }

  updateHero(hero){
    this.HeroCollection.doc(hero.id).set({
      name : hero.data.name,
      id : hero.data.id,
      info : hero.data.info,
      img : hero.data.img
    })
  }

  deleteHero(hero){
    this.HeroCollection.doc(hero.id).delete();
  }
}
