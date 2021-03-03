import { Component, OnInit } from '@angular/core';
import { AboutService } from '../_services/about.service';
import { AboutModel } from '../_models/about-model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about: AboutModel;

  constructor(private api:AboutService) { 
    this.about = new AboutModel();
  }

  ngOnInit() { 
      this.api.GetAll()
      .subscribe({
        next: (data:any) => {
          this.about = data;
        },
        error: error => {
            console.error('There was an error: ', error);
        },
    });
  }
}
