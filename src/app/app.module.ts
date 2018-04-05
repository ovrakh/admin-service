import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
import { MyHttpInterceptor } from './http.interceptors';


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { HomeService } from './services/home.service';
import { TaskService } from './services/task.service';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { TaskComponent } from './task/task.component';
import { ErrorAuthComponent } from './error-auth/error-auth.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AuthorizationComponent,
    HomeComponent,
    TaskComponent,
    ErrorAuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    ApiService,
    HomeService,
    TaskService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
