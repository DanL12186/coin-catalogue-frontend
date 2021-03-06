import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { HttpClientModule } from '@angular/common/http';
import { CoinComponent } from './components/coin/coin.component';
import { Slugify } from './pipes/slugify.pipe';
import { CoinSeriesIndexComponent } from './components/coin-series-index/coin-series-index.component';
import { GoldComponent } from '././components/gold/gold.component';
import { SilverComponent } from '././components/silver/silver.component'
import { FormsModule } from '@angular/forms';
import { SeriesIndexComponent } from './components/series-index/series-index.component';
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';
import { OtherComponent } from './other/other.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WishlistsComponent } from './components/wishlists/wishlists.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CoinComponent,
    Slugify,
    CoinSeriesIndexComponent,
    GoldComponent,
    LoginComponent,
    SilverComponent,
    SeriesIndexComponent,
    SearchBarComponent,
    OtherComponent,
    ToolbarComponent,
    SignupComponent,
    WishlistsComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
