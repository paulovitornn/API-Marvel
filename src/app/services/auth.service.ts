import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthenticated:boolean = false;

  constructor(private router : Router) { }

  login(user:any){
    if(user.name === 'heroMarvel' &&
      user.pwd === '123456'){
        this.userAuthenticated = true;
        console.log(user);
        this.router.navigate(['/heroes']);

      } else {
        this.userAuthenticated = false;
      }
  }

  logout(){
    this.userAuthenticated = false;
  }

  getLogged(){
    return this.userAuthenticated;
  }
}
