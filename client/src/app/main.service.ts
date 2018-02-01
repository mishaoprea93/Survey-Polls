import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class MainService {
  
  user:object;
  data=new BehaviorSubject(this.user);

  polls;
  pollsObserver=new BehaviorSubject(this.polls);

  options;
  optionsObserver=new BehaviorSubject(this.options);

  
  constructor(private _http:Http,private _router:Router) { }

  login(name){
    this._http.post('/login',{name:name}).subscribe((res)=>{
      this.user=res.json();
      console.log(this.user);
      this.data.next(this.user);
      this._router.navigate(['home']);
    })
  }

  checksession(cb){
    this._http.get('/checkSession').subscribe((res)=>{
      cb(res.json());
    })
  }

  addPoll(poll){
    this._http.post('/addpoll',poll).subscribe((res)=>{
      this.polls=res.json();
      this.pollsObserver.next(this.polls);
      this._router.navigate(['home']);
    })
  }

  findAllPolls(cb){
    this._http.get('/findpolls').subscribe((res)=>{
      this.polls=res.json();
      console.log('findallresult',this.polls);
      cb(res.json());
      this.pollsObserver.next(this.polls);
    })
  }

  pollDelete(id){
    this._http.post('/deletepoll',{id:id}).subscribe((res)=>{
      this.polls=res.json();
      this.pollsObserver.next(this.polls);
    })
  }

  thisPoll(id){
    this._http.post('/options',{id:id}).subscribe((res)=>{
      this.options=res.json();
      console.log(this.options);
      this.optionsObserver.next(this.options);
      this._router.navigate(['/option'])
    })
  }

  vote(id){
    this._http.post('/vote',{id:id}).subscribe((res)=>{
      this.options=res.json();
      this.optionsObserver.next(this.options);
    })
  }

}
