import { Component, OnInit, Input } from '@angular/core';
import { NewsItem } from './news-item/news-item.model';
import { NewsService } from './news.service';
import { InfoMessage } from './info-message.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  @Input() query = 'bitcoin';
  infoMessage: InfoMessage;
  news: NewsItem[] = [];
  noMoreItems = false;
  pageToLoadNext = 1;
  placeholders = [];
  loading = false;
  pageSize = 5;

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.loadNext();
  }

  loadNext() {
    if (this.loading || this.noMoreItems || this.news.length >= 30) {
      return;
    }
    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.newsService
      .getNews(this.query, this.pageSize, this.pageToLoadNext)
      .subscribe((response) => {
        switch (response.status) {
          case 'ok':
            this.placeholders = [];
            this.loading = false;
            this.news = this.news.concat(response.articles);
            if (response.articles.length < this.pageSize) {
              this.infoMessage = {status: 'info', message: 'No more items!'};
              this.noMoreItems = true;
              return;
            }
            this.pageToLoadNext++;
            return;
          case 'error':
            this.placeholders = [];
            this.infoMessage = {status: 'danger', message: response.message};
            console.log(response.message);
            return;
        }
      });
  }

}
