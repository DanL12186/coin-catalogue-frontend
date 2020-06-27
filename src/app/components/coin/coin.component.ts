import { Component, OnInit } from '@angular/core';
import { CoinDataService } from '../../services/data/coin-data.service';
import { Coin } from '../../models/coin';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {
  coin: Coin;

  constructor(private coinDataService: CoinDataService, 
              private route: ActivatedRoute,
              private titleService: Title
             ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    this.coin = new Coin(0, 0, '', '', '', 0, '', null, 0, '', 0.0);

    this.coinDataService
        .getCoin(params)
        .subscribe(
          data => this.handleResponse(data),
          failure => this.handleError(failure)
        )
  }

  handleResponse = (data : Coin) => {
    Object.assign(this.coin, data)

    this.titleService.setTitle(`${this.coin.yearAndMintmark()} ${this.coin.series}`)
    console.log(this.coin)
  }

  handleError = (data: HttpErrorResponse) => {
    console.log('bohnoes D:', data);
  }

}