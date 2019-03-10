import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { NewsResponse } from './news-response.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiKey = '0d40171008e048cea104e08367e5e3ce';
  baseUrl = `https://newsapi.org/v2/everything?apiKey=${this.apiKey}`;

  constructor(
    private http: HttpClient
  ) { }

  getNews(query: string, pageSize: number, page: number): Observable<NewsResponse> {
    const url = `${this.baseUrl}&q=${encodeURI(query)}&pageSize=${pageSize}&page=${page}`;
    return this.http.get<NewsResponse>(url).pipe(
      map((response) => {
        if (response.status === 'ok') {
          response.articles = response.articles.map((article) => {
            article.sentiment = 0.5;
            return article;
          });
          return response;
        }
        return response;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        const response = errorResponse.error as NewsResponse;
        return of(response);
      })
    );
  }


}
