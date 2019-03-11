import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemComponent } from './news-item.component';
import { NewsItem } from './news-item.model';

const mockPositiveNews = {
  title: 'Cat is saved from tree!',
  description: 'Some courageous firemen saved a feral cat from an oak tree on Saturday.',
  sentiment: 0.7,
  author: 'John Writer',
  publishedAt: '2019-02-12',
  url: 'https://google.com'
} as NewsItem;

const mockNeutralNews: NewsItem = {
  title: 'Cat is not dog.',
  description: 'Scientists discovered that cat is not dog. That is all.',
  sentiment: 0.47,
  author: 'John Writer',
  publishedAt: '2019-02-12',
  url: 'https://google.com'
} as NewsItem;

const mockNegativeNews: NewsItem = {
  title: 'Kid finds lamp but no genie. Only hotsauce.',
  description: 'An unfortunate event occurred on Sunday. A kid found a horrible lamp without a genie.',
  sentiment: 0.2,
  author: 'John Writer',
  publishedAt: '2019-02-12',
  url: 'https://google.com'
} as NewsItem;

describe('NewsItemComponent', () => {
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsItemComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;
    component.newsItem = mockNeutralNews;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.newsItem = mockNeutralNews;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display negative sentiment if content.sentiment < 0.4', () => {
    component.newsItem = mockNegativeNews;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.positive')).toBeFalsy();
    expect(compiled.querySelector('.neutral')).toBeFalsy();
    expect(compiled.querySelector('.negative')).toBeTruthy();
  });

  it('should display neutral sentiment if 0.4 <= content.sentiment < 0.6', () => {
    component.newsItem = mockNeutralNews;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.positive')).toBeFalsy();
    expect(compiled.querySelector('.negative')).toBeFalsy();
    expect(compiled.querySelector('.neutral')).toBeTruthy();
  });

  it('should display positive sentiment if content.sentiment >= 0.6', () => {
    component.newsItem = mockPositiveNews;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.negative')).toBeFalsy();
    expect(compiled.querySelector('.neutral')).toBeFalsy();
    expect(compiled.querySelector('.positive')).toBeTruthy();
  });
});
