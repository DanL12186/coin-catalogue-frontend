import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GoldComponent } from './components/gold/gold.component';
import { SilverComponent } from './components/silver/silver.component';
import { SeriesIndexComponent } from './components/series-index/series-index.component';
import { CoinSeriesIndexComponent } from './components/coin-series-index/coin-series-index.component';
import { CoinComponent } from './components/coin/coin.component';
import { OtherComponent } from './other/other.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WishlistsComponent } from './components/wishlists/wishlists.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'gold', component: GoldComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'silver', component: SilverComponent },
  { path: 'other', component: OtherComponent },
  { path: 'wishlists', component: WishlistsComponent },
  { path: 'coins/:denomination', component: SeriesIndexComponent },
  { path: 'coins/:denomination/:series', component: CoinSeriesIndexComponent },
  { path: 'coins/:denomination/:series/:year-mintmark-and-designation', component: CoinComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }