import { Component, OnInit } from '@angular/core';
import { AboutService } from '../_services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private api:AboutService) { }

  ngOnInit(): void { 
      this.api.GetAll().subscribe((data)=>{
          console.warn('My about info: ', data);
      });
  }
}
