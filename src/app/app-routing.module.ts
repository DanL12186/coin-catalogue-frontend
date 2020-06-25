import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { CoinComponent } from './coin/coin.component';
import { CoinSeriesIndexComponent } from './coin-series-index/coin-series-index.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'coins', component: CoinComponent },
  { path: 'coins/:denomination', component: CoinComponent },
  { path: 'coins/:denomination/:series', component: CoinSeriesIndexComponent },
  { path: 'coins/:denomination/:series/:year-and-mintmark', component: CoinComponent }
  // { path: 'welcome', component: WelcomeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
