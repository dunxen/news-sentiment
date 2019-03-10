import { NewsItem } from './news-item/news-item.model';

export interface NewsResponse {
  status: 'ok' | 'error';
  code?: string;
  message?: string;
  totalResults?: number;
  articles?: NewsItem[];
}
