import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Md5} from 'ts-md5';
import { Observable } from 'rxjs';

@Injectable(
  /* {providedIn: 'root'} */
)
export class ApiMarvelService {

  private publicKey:string = '5a237863b3cc2061003cbbc4fe20dc06';
  private privateKey:string = 'fbf255068eccea6d0ef951b9f25626b57ab2fe72';
  private baseURL:string = 'https://gateway.marvel.com/';
  private limitCharacteres:string = 'limit=20&';
  private urlCharacters:string = 'v1/public/characters';
  private urlHeroesForName:string = 'nameStartsWith='

  constructor(
    private http: HttpClient
  ) { }

  private createHash (timeStamp:string):any {
    let toBeHashed = timeStamp + this.privateKey + this.publicKey;
    let hashedMessage = Md5.hashStr(toBeHashed);
    return hashedMessage;
  }

  private getTimeStamp():string{
    let ts = Date.now().toString();
    return ts;
  }

  private getHash():any {
    let ts = this.getTimeStamp();
    let hash = this.createHash(ts);
    let tsHash = {
      ts: ts,
      hash: hash
    }
    return tsHash;
  }

  public getListHeroes(limit:string): Observable<any[]>  {
    let tsHash = this.getHash();
    if(limit != '20'){
      this.limitCharacteres = 'limit='+limit+'&';
    }

    return this.http.get<any[]>(this.baseURL+this.urlCharacters+'?'+this.limitCharacteres+'ts='+tsHash.ts+'&apikey='+this.publicKey+'&hash='+tsHash.hash);
  }

  public getHeroesByStartName(nameHero:string, limit:string): Observable<any[]> {
    let tsHash = this.getHash();
    if(limit != '20'){
      this.limitCharacteres = '&limit='+limit+'&';
    }
    return this.http.get<any[]>(this.baseURL+this.urlCharacters+'?'+this.urlHeroesForName+nameHero+this.limitCharacteres+'ts='+tsHash.ts+'&apikey='+this.publicKey+'&hash='+tsHash.hash);
  }


  public getHeroById(id:number): Observable<any[]>  {
    let tsHash = this.getHash();

    return this.http.get<any[]>(this.baseURL+this.urlCharacters+'/'+id+'?ts='+tsHash.ts+'&apikey='+this.publicKey+'&hash='+tsHash.hash);
  }
}
