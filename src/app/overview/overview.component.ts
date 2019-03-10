import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news-list/news.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  gaugeConfig = {
    canvasWidth: 300,
    needleValue: 50,
    centralLabel: '',
    name: 'Average Sentiment',
    bottomLabel: '50%',
    options: {
      hasNeedle: true,
      needleColor: 'black',
      needleUpdateSpeed: 1000,
      arcColors: ['#D63230', '#F3D34A', '#08A045'],
      arcDelimiters: [40, 60],
      rangeLabel: ['0', '100'],
      needleStartValue: 50
    }
  };

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.newsService.averageSentimentStream.subscribe((average) => {
      this.gaugeConfig.needleValue = average * 100;
      this.gaugeConfig.bottomLabel = `${(average * 100).toFixed(2)}%`;
    });
  }

}
