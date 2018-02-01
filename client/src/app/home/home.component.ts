import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  session_user;
  polls;
  
  constructor(private _mainService:MainService,private _router:Router) { 
    this._mainService.data.subscribe(
      (data) => { this.session_user = data }
    )

    this._mainService.pollsObserver.subscribe(
      (polls)=>{ this.polls=polls }
    )
  }
  
  ngOnInit() {
    this._mainService.checksession((user)=>{
      if(user.user){
        this.session_user=user;
        this._mainService.findAllPolls((polls)=>{
          this.polls=polls;
        })

      }else{
        this._router.navigate([''])
      }
    })
  }

  pollDelete(id){
      this._mainService.pollDelete(id);
  }

  thisPoll(id){
    this._mainService.thisPoll(id);
  }

 
}
