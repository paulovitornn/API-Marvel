import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero:any;
  heroSelected:any;

  constructor() { }

  ngOnInit(): void {
    this.heroSelected = null;
    this.setHeroSelected();
  }

  public setHeroSelected(){
    this.heroSelected = this.hero;
  }

  public getUrlImage(hero: any): string {
    let urlImage = hero.thumbnail.path + '.' + hero.thumbnail.extension;
    return urlImage;
  }

}
