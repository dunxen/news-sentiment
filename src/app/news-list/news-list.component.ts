import { Component, OnInit } from '@angular/core';
import { NewsItem } from './news-item/news-item.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  news: NewsItem[] = [
    {
      headline: 'This is a news headline.',
      summary: 'This is a short summary of the content.',
      datePublished: '2019-02-23',
      author: 'Billy Bob',
      sentiment: 0.54
    } as NewsItem,
    {
      headline: 'The Samsung Galaxy S10 has a cryptocurrency wallet built in.',
      summary: `
Samsung is the first major smartphone maker to include a cryptocurrency wallet in its latest flagship Galaxy
S10 phones. The wallet lets users store bitcoin, Ethereum, and a beauty-related cryptocurrency called Cosmo Coin.
It’s a cold storage wallet, meaning
      `,
      datePublished: '2019-02-23',
      author: 'Billy Bob',
      sentiment: 0.68
    } as NewsItem,
    {
      headline: 'This is a news headline.',
      summary: 'This is a short summary of the content.',
      datePublished: '2019-02-23',
      author: 'Billy Bob',
      sentiment: 0.2
    } as NewsItem
  ];
  placeholders = [1];
  query = 'bitcoin';

  constructor() { }

  ngOnInit() {
  }

  loadNext() {

  }

}
