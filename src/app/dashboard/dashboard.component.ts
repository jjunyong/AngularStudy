import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {MatSnackBar} from '@angular/material';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes : any = [];

  constructor(private heroService: HeroService,
              private snackBar : MatSnackBar,
              private auth : AuthService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      // .subscribe(heroes => this.heroes = heroes.slice(1, 5));
      .subscribe(heroes => this.heroes = heroes);

  }

  deleteHero(hero){
    this.heroService.deleteHero(hero);
    this.snackBar.open("Hero deleted","",{
      duration: 2000
    })
  }

  clickLike(hero){
    this.heroService.clickLike(hero);
  }
}
