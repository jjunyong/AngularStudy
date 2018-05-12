import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nickname : string;
  age : number;

  constructor(public auth: AuthService) { 

  }
  login(){
    this.auth.login();
  }
  logout(){
    this.auth.logout();
  }

  ngOnInit() {
  }


}
