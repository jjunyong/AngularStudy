import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import {MatSnackBar} from '@angular/material'
import { Observable } from 'rxjs/Observable'
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { tap } from 'rxjs/operators'
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit {
  
  hero: Hero;
  task : AngularFireUploadTask;
  percentage : Observable<number>;
  snapshot: Observable<any>;
  downloadURL : Observable<string>;
  isHovering : boolean;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public snackBar : MatSnackBar,
    private storage : AngularFireStorage,
    private firestore : AngularFirestore
  ) {
    this.hero = new Hero;
    // this.hero.img =  "https://material.angular.io/assets/img/examples/shiba2.jpg";
  }

  ngOnInit(){

  }

  goBack(): void {
    this.heroService.addHero(this.hero);
    this.location.back();
    this.snackBar.open("Hero added","",{
      duration: 2000
    })
  }

  // this method is event handler. It take FileList as parameter.
  startUpload(event : FileList){
    const file = event.item(0);

    // Client-side validation example
    if(file.type.split('/')[0] !== 'image'){
      console.error("Unsupported file type!");
      return;
    }

    // Storage path
    const path = `hero_image/${new Date().getTime()}_${file.name}`;
    const customMetadata = { app : 'My FinalExam web' }
    
    // Subscribe is not required it is automatic
    this.task = this.storage.upload(path, file, { customMetadata });

    // progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    // this.snapshot = this.task.snapshotChanges().pipe(
    //   tap(snap=>{
    //     if(snap.bytesTransferred === snap.totalBytes){
    //       this.firestore.collection("test").add({
    //         path,
    //         size: snap.totalBytes
    //       })
    //     }
    //   })
    // )
    // The file's download URL! 여기서 subscribe하여 url를 hero.img에 저장해야 한다. subscribe를 해야 Observable<string> 타입이 아닌
    // string type으로 반환되기 때문!
    this.task.downloadURL()
      .subscribe(url=>
        this.hero.img = url
      )
  }

  // Data contained in the snapshot is very useful for customizing behavior in Front-end as below;
  isActive(snapshot){
     return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
}
