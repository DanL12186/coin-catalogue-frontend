import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { HttpClientModule } from '@angular/common/http';
import { CoinComponent } from './components/coin/coin.component';
import { Slugify } from './pipes/slugify.pipe';
import { CoinSeriesIndexComponent } from './components/coin-series-index/coin-series-index.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CoinComponent,
    Slugify,
    CoinSeriesIndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
