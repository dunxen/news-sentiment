import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbListModule, NbAlertModule } from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsItemComponent } from './news-list/news-item/news-item.component';
import { NewsItemPlaceholderComponent } from './news-list/news-item-placeholder/news-item-placeholder.component';
import { GaugeChartModule } from 'angular-gauge-chart';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    NewsListComponent,
    NewsItemComponent,
    NewsItemPlaceholderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    NbListModule,
    NbAlertModule,
    AppRoutingModule,
    GaugeChartModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
