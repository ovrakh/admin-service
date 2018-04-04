import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component'
import { TaskComponent } from "./task/task.component";
import { HomeGuard }   from './home/home.guards';
import { TaskGuard } from "./task/task.guards";
import { RegisterGuard } from "./register/register.guard";
import { AuthorizationGuard } from "./authorization/authorization.guard";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, canActivate: [ RegisterGuard ] },
  { path: 'authorization', component: AuthorizationComponent, canActivate: [ AuthorizationGuard ] },
  { path: 'home', component: HomeComponent, canActivate: [ HomeGuard ] },
  { path: 'task', component: TaskComponent, canActivate: [ TaskGuard ] }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ HomeGuard, TaskGuard, RegisterGuard, AuthorizationGuard ]
})
export class AppRoutingModule { }
