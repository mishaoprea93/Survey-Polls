import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import{HomeComponent} from './home/home.component';
import { PollComponent } from './poll/poll.component';
import {OptionComponent} from './option/option.component'



const routes: Routes = [{ path:'',pathMatch:'full', component: LoginComponent },
{path:'home',component:HomeComponent},
{path:'poll',component:PollComponent},
{path:'option',component:OptionComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
