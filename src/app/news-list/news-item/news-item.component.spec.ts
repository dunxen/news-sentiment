import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemComponent } from './news-item.component';
import { NewsItem } from './news-item.model';

const mockPositiveNews: NewsItem = {
  headline: 'Cat is saved from tree!',
  summary: 'Some courageous firemen saved a feral cat from an oak tree on Saturday.',
  sentiment: 0.7,
  author: 'John Writer',
  datePublished: '2019-02-12'
};

const mockNeutralNews: NewsItem = {
  headline: 'Cat is not dog.',
  summary: 'Scientists discovered that cat is not dog. That is all.',
  sentiment: 0.47,
  author: 'John Writer',
  datePublished: '2019-02-12'
};

const mockNegativeNews: NewsItem = {
  headline: 'Kid finds lamp but no genie. Only hotsauce.',
  summary: 'An unfortunate event occurred on Sunday. A kid found a horrible lamp without a genie.',
  sentiment: 0.2,
  author: 'John Writer',
  datePublished: '2019-02-12'
};

describe('NewsItemComponent', () => {
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;
    component.content = mockNeutralNews;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.content = mockNeutralNews;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display negative sentiment if content.sentiment < 0.4', () => {
    component.content = mockNegativeNews;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.positive')).toBeFalsy();
    expect(compiled.querySelector('.neutral')).toBeFalsy();
    expect(compiled.querySelector('.negative')).toBeTruthy();
  });

  it('should display neutral sentiment if 0.4 <= content.sentiment < 0.6', () => {
    component.content = mockNeutralNews;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.positive')).toBeFalsy();
    expect(compiled.querySelector('.negative')).toBeFalsy();
    expect(compiled.querySelector('.neutral')).toBeTruthy();
  });

  it('should display positive sentiment if content.sentiment >= 0.6', () => {
    component.content = mockPositiveNews;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.negative')).toBeFalsy();
    expect(compiled.querySelector('.neutral')).toBeFalsy();
    expect(compiled.querySelector('.positive')).toBeTruthy();
  });
});
