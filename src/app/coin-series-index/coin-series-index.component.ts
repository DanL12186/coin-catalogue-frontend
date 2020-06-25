import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinDataService } from '../services/data/coin-data.service';
import { Coin } from '../models/coin';

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
  seriesName   = this.params.series.split('-').join(' ');
  url          = window.location.pathname;
  
  constructor(private route: ActivatedRoute,
              private coinDataService: CoinDataService
             ) { }

  ngOnInit(): void {
    this.coinDataService
        .getCoins(this.params)
        .subscribe(
          data => this.handleResponse(data),
          failure => this.handleError(failure)
        )
  }

  sortByProperty(property) {
    this.coins.sort((a, b) => {
      return a[property] - b[property] || a.yearAndMintmark().localeCompare(b.yearAndMintmark())
    })

    if (this.sorted) {
      this.coins.reverse()
    }

    this.sorted = !this.sorted
  }

  handleResponse(data: Coin[]) {
    console.log(data)
    this.coins = data.map(json => Object.assign(new Coin(null, null, null, null, null, null, null, null, null, null, null), json['attributes']))
  }

  handleError(error) {
    console.log(error)
  }

}
