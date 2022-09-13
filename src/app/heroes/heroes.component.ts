import { Component, OnInit } from '@angular/core';
import { ApiMarvelService } from '../services/api-marvel.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: any;
  public _searchNameHero: string = '';
  public limitResult: string = '50';

  constructor(
    private apiMarvelSrv: ApiMarvelService
  ) { }

  ngOnInit(): void {
    this.getAllHeroes();
  }

  public getUrlImage(hero: any): string {
    let urlImage = hero.thumbnail.path + '.' + hero.thumbnail.extension;
    return urlImage;
  }

  private getAllHeroes(): void {
    this.apiMarvelSrv.getListHeroes(this.limitResult).subscribe({
      next: (heroes: any) => {
        this.heroes = heroes.data.results;
      },
      error: (error: any) => {
        console.log("Erro na requisição de heróis.");
        console.log(error);
      },
      complete: () => console.log("Finalizando requisição.")
    })
  }

  public getHeroesById(id: number): void {
    this.apiMarvelSrv.getHeroById(id).subscribe({
      next: (x: any) => {
        console.log(x.data.results);
      },
      error: (error: any) => {
        console.log("Erro na requisição de heróis.");
        console.log(error);
      },
      complete: () => console.log("Finalizando requisição.")
    })
  }

  public getHeroesByStartName(startName: string): void {
    if(startName.length>0){
      this.apiMarvelSrv.getHeroesByStartName(startName, this.limitResult).subscribe({
        next: (x: any) => {
          this.heroes = x.data.results;
        },
        error: (error: any) => {
          console.log("Erro na requisição de heróis.");
          console.log(error);
        },
        complete: () => console.log("Finalizando requisição.")
      })
    } else {
      this.getAllHeroes();
    }

  }

  public get searchNameHero() {
    return this._searchNameHero;
  }

  public set searchNameHero(nameHero: string) {
    this._searchNameHero = nameHero;
  }

}
