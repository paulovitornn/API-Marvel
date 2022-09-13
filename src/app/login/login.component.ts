import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:any = {
    name: '',
    pwd: ''
  };

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  public login (){
    console.log(this.user);
    this.authService.login(this.user)
  }

}
