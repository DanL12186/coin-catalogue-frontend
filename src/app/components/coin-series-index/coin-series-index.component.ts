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
  coins           : Coin[];
  isSorted        : boolean;
  varietiesHidden : boolean;
  mintmarkFilter  : string;
  filteredCoins   : Coin[];
  seriesObverse   : string;
  seriesReverse   : string;
  mintmarks       : Set<string> = new Set("All");

  params       = this.route.snapshot.params;
  denomination = this.params.denomination;
  seriesName   = this.params.series?.split('-')?.join(' ');
  category     = Coin.denominationToCategory(this.denomination);

  sortByLabels = { year: 'Sort By Year', 
                   mintage: 'Sort By Mintage', 
                   pcgs_total: 'Sort By PCGS Total', 
                 };
  
  constructor(private route: ActivatedRoute,
              private coinDataService: CoinDataService,
              private titleService: Title
             ) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.denomination} ${this.seriesName || this.category}`);
    
    this.seriesObverse = sessionStorage.getItem('seriesObverse');
    this.seriesReverse = sessionStorage.getItem('seriesReverse');

    this.coinDataService
        .getCoins(this.params)
        .subscribe(
          data => this.handleResponse(data),
          failure => this.handleError(failure)
        )
  }

  sortCoinsByProperty(property : string) {
    this.filteredCoins.sort((a : Coin, b : Coin) => {
      return a[property] - b[property] || a.description().localeCompare(b.description())
    })

    if (this.isSorted) {
      this.filteredCoins.reverse();
    }

    this.sortByLabels[property] = `Sort By ${property} ${this.isSorted ? '▼' : '▲'}`;

    this.isSorted = !this.isSorted;
  }

  handleResponse(data: Coin[]) {
    this.coins = data.map(json => Object.assign(new Coin(), json));
    this.setComponentProperties();
    this.sortCoinsByProperty('year');
  }

  handleError(error) {
    console.log(error)
  }

  setComponentProperties() {
    this.filteredCoins = this.coins;
    this.mintmarks = new Set(this.coins.map(coin => coin.mintmark || 'All'))
  }

  filterDisplayedCoinsByMintmark(mark : string) {
    this.mintmarkFilter = mark;

    if (mark === 'All') {
      return this.filteredCoins = this.varietiesHidden ? this.coins.filter(coin => !coin.special_designation) : this.coins;
    } else if (mark === '') {
      mark = null;
    }

    this.filteredCoins = this.coins.filter(coin => coin.mintmark === mark);

    if (this.varietiesHidden) {
      this.hideVarieties('true');
    }
  }

  hideVarieties(filter) {
    this.varietiesHidden = filter === 'true';
    
    if (this.varietiesHidden) {
      this.filteredCoins = this.filteredCoins.filter(coin => !coin.special_designation)
    } else {
      this.filterDisplayedCoinsByMintmark(this.mintmarkFilter || 'All')
    }
  }

}