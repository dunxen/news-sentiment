import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbCardModule } from '@nebular/theme';
import { RouterTestingModule } from '@angular/router/testing';
import { GaugeChartModule } from 'angular-gauge-chart';
import { NewsService } from '../news-list/news.service';
import { Subject } from 'rxjs';

class MockNewsService {
  averageSentimentStream = new Subject<number>();
}

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let newsService: NewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'default' }),
        NbCardModule,
        RouterTestingModule.withRoutes([]),
        GaugeChartModule
      ],
      providers: [
        { provide: NewsService, useClass: MockNewsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    newsService = TestBed.get(NewsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update #gaugeConfig on new value received', () => {
    newsService.averageSentimentStream.next(0.45);
    expect(component.gaugeConfig.needleValue).toBe(45);
    expect(component.gaugeConfig.bottomLabel).toBe('45.00%');
  });
});
