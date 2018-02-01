import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  poll:object;
  session_user;


  constructor(private _mainService:MainService,private _router:Router) { 
    this._mainService.data.subscribe(
      (data) => { this.session_user = data }
    )
  this.poll={
    question:"What state is the best to live in?",
    option1:"WA",
    option2:"IL",
    option3:"CO",
    option4:"CA"
  }

 
    
  }

  addpoll(){
    this._mainService.addPoll(this.poll);
    
  }

  ngOnInit() {
    this._mainService.checksession((user)=>{
      console.log("Session user",this.session_user);
      console.log("res",user);
      if(user.user){
        this.session_user=user;
      }else{
        this._router.navigate([''])
      }
    })
  }
  


}
