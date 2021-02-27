import { Component } from '@angular/core';

@Component({
  selector:'app-root',
  template: `
  <app-header></app-header>
  <app-footer></app-footer>
  `
})
export class AppComponent {
  title = 'Admin City';
  /*
  texto : string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;
  */
}
