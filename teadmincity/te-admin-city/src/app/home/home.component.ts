import { Component, OnInit } from '@angular/core';
import { NewsService } from '../_services/news.service';
import { NewsModel } from '../_models/news-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  news: NewsModel[];

  constructor(private api:NewsService) { 
    this.news = [];
  }

  ngOnInit(): void {
    this.api.GetAll()
      .subscribe({
        next: (data:any) => {
          this.news = data.news;
          console.log(this.news);
        },
        error: error => {
            console.error(error);
        },
    });
  }
}
