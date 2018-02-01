import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name:string;
  session_user:object;
  constructor(private _mainService:MainService) {
    this._mainService.data.subscribe(
      (data) => { this.session_user = data }
    )
    this.name="";
  }
  
  login(){
    this._mainService.login(this.name);
    
  }


  ngOnInit() {
    
  }

}
