import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

const routes: Routes = [
  {path: '', component: HomeLayoutComponent, children:[
    {path: '', component: HomeComponent},
    {path: 'map', component: MapComponent},
    {path: 'search', component: SearchComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
  ]},
  {path: '', component: LoginLayoutComponent, children:[
    {path: 'login', component: LoginComponent}
  ]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
