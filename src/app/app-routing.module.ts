import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CoinComponent } from './components/coin/coin.component';
import { CoinSeriesIndexComponent } from './components/coin-series-index/coin-series-index.component';
import { GoldComponent } from './gold/gold.component';
import { SilverComponent } from './silver/silver.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'gold', component: GoldComponent },
  { path: 'silver', component: SilverComponent },
  { path: 'coins/:denomination', component: CoinSeriesIndexComponent },
  { path: 'coins/:denomination/:series', component: CoinSeriesIndexComponent },
  { path: 'coins/:denomination/:series/:year-and-mintmark', component: CoinComponent }
  // { path: 'welcome', component: WelcomeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
