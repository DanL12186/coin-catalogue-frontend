import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinDataService } from '../../services/data/coin-data.service';
import { Coin } from '../../models/coin';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-coin-series-index',
  templateUrl: './coin-series-index.component.html',
  styleUrls: ['./coin-series-index.component.scss']
})

export class CoinSeriesIndexComponent implements OnInit {
  coins        : Coin[];
  sorted       : boolean;

  params       = this.route.snapshot.params;
  denomination = this.params.denomination;
  seriesName   = this.params.series?.split('-')?.join(' ');
  category     = Coin.denominationToCategory(this.denomination);

  sortByLabels = { year: 'Sort By Year', mintage: 'Sort By Mintage', pcgs_total: 'Sort By PCGS Total' };
  
  constructor(private route: ActivatedRoute,
              private coinDataService: CoinDataService,
              private titleService: Title
             ) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.denomination} ${this.seriesName || this.category}`);

    this.coinDataService
        .getCoins(this.params)
        .subscribe(
          data => this.handleResponse(data),
          failure => this.handleError(failure)
        )
  }

  sortCoinsByProperty(property : string) {
    this.coins.sort((a : Coin, b : Coin) => {
      return a[property] - b[property] || a.description().localeCompare(b.description())
    })

    if (this.sorted) {
      this.coins.reverse();
    }

    this.sortByLabels[property] = `Sort By ${property} ${this.sorted ? '▼' : '▲'}`;

    this.sorted = !this.sorted;
  }

  handleResponse(data: Coin[]) {
    this.coins = data.map(json => Object.assign(new Coin(), json))
    // console.log(this.coins)
    this.sortCoinsByProperty('year');
  }

  handleError(error) {
    console.log(error)
  }

}