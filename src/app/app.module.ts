import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { HttpClientModule } from '@angular/common/http';
import { CoinComponent } from './components/coin/coin.component';
import { Slugify } from './pipes/slugify.pipe';
import { CoinSeriesIndexComponent } from './components/coin-series-index/coin-series-index.component';
import { GoldComponent } from './gold/gold.component';
import { SilverComponent } from './silver/silver.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CoinComponent,
    Slugify,
    CoinSeriesIndexComponent,
    GoldComponent,
    SilverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
