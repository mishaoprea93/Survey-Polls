import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  options;
  session_user;

  constructor(private _mainService:MainService, private _router:Router) {
    this._mainService.data.subscribe(
      (data) => { this.session_user = data }
    )

    this._mainService.optionsObserver.subscribe(
      (options)=>{ this.options=options }
    )
   }

  ngOnInit() {
    this._mainService.checksession((user)=>{
      if(user.user){
        this.session_user=user;
      }else{
        this._router.navigate([''])
      }
    })
  }

  vote(id){
    this._mainService.vote(id);
  }
  

}
