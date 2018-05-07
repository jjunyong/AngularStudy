import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import {MatSnackBar} from '@angular/material'

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit {
  
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public snackBar : MatSnackBar
  ) {
    this.hero = new Hero;
    this.hero.img =  "https://material.angular.io/assets/img/examples/shiba2.jpg";
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
}
