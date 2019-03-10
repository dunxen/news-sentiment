import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NewsListComponent } from './news-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbCardModule, NbListModule, NbAlertModule } from '@nebular/theme';
import { RouterTestingModule } from '@angular/router/testing';
import { NewsItemComponent } from './news-item/news-item.component';
import { NewsItemPlaceholderComponent } from './news-item-placeholder/news-item-placeholder.component';
import { NewsService } from './news.service';
import { Observable, of } from 'rxjs';
import { NewsResponse } from './news-response.model';

const mockArticles = [
  {
    author: 'Bob',
    description: 'Things are good.',
    sentiment: 0.7,
  },
  {
    author: 'Jane',
    description: 'Things are great.',
    sentiment: 0.8,
  },
  {
    author: 'Sally',
    description: 'Things are bad.',
    sentiment: 0.2,
  },
  {
    author: 'John',
    description: 'Things are bad.',
    sentiment: 0.2,
  },
  {
    author: 'Leila',
    description: 'Things are terrible.',
    sentiment: 0.1,
  },
];

class MockNewsService {
  getNews(
    query: string,
    pageSize: number,
    page: number
  ): Observable<NewsResponse> {
    if (page === 0) {
      return of({
        status: 'error',
        message: 'The page value must be >= 1'
      } as NewsResponse);
    }

    if (query === 'found') {
      return of({
        status: 'ok',
        articles: mockArticles
      } as NewsResponse);
    }

    return of({status: 'ok', articles: []} as NewsResponse);
  }
}

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;
  let newsService: NewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewsListComponent,
        NewsItemComponent,
        NewsItemPlaceholderComponent
       ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'default' }),
        NbCardModule,
        NbListModule,
        NbAlertModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: NewsService, useClass: MockNewsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    component.query = 'found';
    newsService = TestBed.get(NewsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#loadNext should short circuit if `loading` is true', () => {
    const getNewsSpy = spyOn(newsService, 'getNews');
    component.loading = true;
    component.loadNext();
    expect(getNewsSpy).toHaveBeenCalledTimes(0);
  });

  it('#loadNext should short circuit if `noMoreItems` is true', () => {
    const getNewsSpy = spyOn(newsService, 'getNews');
    component.noMoreItems = true;
    component.loadNext();
    expect(getNewsSpy).toHaveBeenCalledTimes(0);
  });

  it('#loadNext should short circuit if `news.length` >= 30', () => {
    const getNewsSpy = spyOn(newsService, 'getNews');
    component.news = new Array(30);
    component.loadNext();
    expect(getNewsSpy).toHaveBeenCalledTimes(0);
  });


  it('#noMoreItems should be true if articles returned < `pageSize`', () => {
    component.pageSize = 7;
    component.loadNext();
    expect(component.noMoreItems).toBe(true);
  });

  it('#infoMessage should have "danger" status if NewsResponse is error', () => {
    component.pageToLoadNext = 0;
    component.loadNext();
    expect(component.infoMessage.status).toBe('danger');
  });

});
