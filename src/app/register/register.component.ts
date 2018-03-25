import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegService } from '../reg.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router
    /*private regService: RegService*/) { }

  ngOnInit() {
  }

  add(name: string, password: string): void {
    name = name.trim();
    password = password.trim();
    if (!name) { return; }
    if (!password) { return; }
    alert(name);
    this.router.navigate(['/']);
    // this.heroService.addHero({ name } as Hero)
    //   .subscribe(hero => {
    //     this.heroes.push(hero);
    //   });
  }

}
