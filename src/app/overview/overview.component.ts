import { Component, OnInit } from '@angular/core';

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
    bottomLabel: '50% (Neutral)',
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

  constructor() { }

  ngOnInit() {
  }

}
