import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
  <app-header></app-header>
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  <app-footer></app-footer>`,
  styles: [
  ]
})
export class HomeLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
