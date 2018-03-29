import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component'
import {TaskComponent} from "./task/task.component";

const routes: Routes = [
  { path: '', redirectTo: '/authorization', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent },
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'task', component: TaskComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
