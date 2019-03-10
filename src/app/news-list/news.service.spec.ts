import { TestBed, inject } from '@angular/core/testing';

import { NewsService } from './news.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NewsItem } from './news-item/news-item.model';
import { NewsResponse } from './news-response.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('NewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: NewsService = TestBed.get(NewsService);
    expect(service).toBeTruthy();
  });

  it('#getNews should load the next news items if available',
    inject(
      [HttpTestingController, NewsService],
      (
        httpMock: HttpTestingController,
        newsService: NewsService
      ) => {
        const mockArticles = [
          {author: 'Bob', description: 'Candles'} as NewsItem
        ];
        const mockNewsResponse: NewsResponse = {
          status: 'ok',
          articles: mockArticles
        };
        const query = 'candle';
        const pageSize = 5;
        const page = 1;

        newsService.getNews(query, pageSize, page).subscribe((response) => {
          switch (response.status) {
            case 'ok':
              expect(response.articles = mockArticles);
          }
        });

        const url = `${newsService.baseUrl}&q=${encodeURI(query)}&pageSize=${pageSize}&page=${page}`;
        const mockRequest = httpMock.expectOne(url);

        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(mockNewsResponse);
        httpMock.verify();
      }
    )
  );

  it('#getNews should return NewsReponse with "error" status if API responds with error',
    inject(
      [HttpTestingController, NewsService],
      (
        httpMock: HttpTestingController,
        newsService: NewsService
      ) => {
        const mockNewsResponse: NewsResponse = {
          status: 'error',
          message: 'Hit the API rate limiter.'
        };
        const query = 'candle';
        const pageSize = 5;
        const page = 1;

        newsService.getNews(query, pageSize, page).subscribe((response) => {
          switch (response.status) {
            case 'error':
              expect(response.message = 'Hit the API rate limiter.');
          }
        });

        const url = `${newsService.baseUrl}&q=${encodeURI(query)}&pageSize=${pageSize}&page=${page}`;
        const mockRequest = httpMock.expectOne(url);

        expect(mockRequest.request.responseType).toEqual('json');
        mockRequest.flush(mockNewsResponse);
        httpMock.verify();
      })
  );

  it('#getNews should return NewsReponse with "error" status on network failure.',
    inject(
      [HttpTestingController, NewsService],
      (
        httpMock: HttpTestingController,
        newsService: NewsService
      ) => {
        const query = 'candle';
        const pageSize = 5;
        const page = 1;

        newsService.getNews(query, pageSize, page).subscribe((response) => {
          console.log(response);
          switch (response.status) {
            case 'error':
              expect(response.message = 'There was some kind of network failure.');
          }
        });

        const url = `${newsService.baseUrl}&q=${encodeURI(query)}&pageSize=${pageSize}&page=${page}`;
        const mockRequest = httpMock.expectOne(url);

        expect(mockRequest.request.responseType).toEqual('json');
        const mockHttpErrorResponse = {
          message: 'There was some kind of network failure.',
          status: 'error'
        } as NewsResponse;
        const mockErrorEvent = new ErrorEvent('HttpErrorResponse', {
          error: mockHttpErrorResponse
        });
        console.log(mockErrorEvent.error);
        mockRequest.error(mockErrorEvent);
        httpMock.verify();
      })
  );
});
