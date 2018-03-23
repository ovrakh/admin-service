import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { AuthorizationComponent } from './authorization/authorization.component';

const routes: Routes = [
  { path: '', redirectTo: '/authorization', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent },
  { path: 'authorization', component: AuthorizationComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
