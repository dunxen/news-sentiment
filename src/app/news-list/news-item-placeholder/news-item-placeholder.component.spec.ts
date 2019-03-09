import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemPlaceholderComponent } from './news-item-placeholder.component';

describe('NewsItemPlaceholderComponent', () => {
  let component: NewsItemPlaceholderComponent;
  let fixture: ComponentFixture<NewsItemPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsItemPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
