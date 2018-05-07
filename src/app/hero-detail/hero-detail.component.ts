import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  // @Input() hero: Hero;
  hero : any;
  task : AngularFireUploadTask;
  percentage : Observable<number>;
  snapshot: Observable<any>;
  downloadURL : Observable<string>;
  isHovering : boolean;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private storage : AngularFireStorage
  ) {
    // this.hero = new Hero;
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
      });
  }

  goBack(hero): void {
    this.heroService.updateHero(hero);
    this.location.back();
  }

  startUpload(event : FileList){
    const file = event.item(0);

    // Client-side validation example
    if(file.type.split('/')[0] !== 'image'){
      console.error("Unsupported file type!");
      return;
    }

    // Storage path
    // const path = `hero_image/${new Date().getTime()}_${file.name}`;
    const path = `hero_image/${file.name}`;
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
        this.hero.data.img = url
      )
  }
}
