import { Component, OnInit } from '@angular/core';
import { CoinDataService } from '../../services/data/coin-data.service';
import { Coin } from '../../models/coin';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ChartService } from 'src/app/services/charts/chart.service';
import { baseURL } from '../../shared/constants';

import Panzoom from '@panzoom/panzoom';
import { GoldAndSilverPricesService } from 'src/app/services/data/gold-and-silver-prices.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})

export class CoinComponent implements OnInit {
  coin: Coin;
  ounces: number;
  meltValue: number;
  coinDescription = '';
  panzoom; 
  metalPrices;
  elem: HTMLElement;
  chartData: Array<JSON>
  baseURL = baseURL;

  constructor(private coinDataService: CoinDataService, 
              private route: ActivatedRoute,
              private titleService: Title,
              private chartService: ChartService,
              private metalsPriceService: GoldAndSilverPricesService,
              private router: Router
             ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    this.metalPrices = this.metalsPriceService.fromLocalStorage();

    this.coin = new Coin(0, 0, '', '', '', 0, '', null, 0, '', 0.0, 0.0, 'designer', <JSON>{}, 0, '');

    if (!this.metalPrices) {
      this.metalsPriceService
          .getGoldSilverPrices()
          .subscribe(data => this.handlePriceResponse(data));
    }

    this.coinDataService
        .getCoin(params)
        .subscribe(
          data => this.handleCoinResponse(data),
          failure => this.handleError(failure)
        )
  }

  handleCoinResponse = (data : JSON) => {
    Object.assign(this.coin, data)

    this.titleService.setTitle(`${this.coin.description()} ${this.coin.series}`)

    this.setComponentProperties();
    this.enableZoom()
    this.renderChart()
  }

  handlePriceResponse(data : JSON) {
    this.metalPrices = data
    this.meltValue = this.coin.meltValue(this.metalPrices)
    localStorage.setItem('goldAndSilverPrices', JSON.stringify(data))
  }

  handleError = (data : HttpErrorResponse) => {
    console.log('bohnoes D:', data);
  }

  setComponentProperties() {
    this.meltValue = this.coin.meltValue(this.metalPrices)
    this.ounces = this.coin.weightInOunces()
    this.coinDescription = this.coin.description()
    this.chartData = this.formatChartData(this.coin.pcgs_population)
  }

  renderChart = () => {
    this.chartService.renderChart(this.chartData)
  }

  formatChartData = (data: JSON) : JSON[] => {
    return this.chartService.format(data, this.coin.price_table);
  }

  enableZoom = () => {
    this.elem = document.getElementById('panzoom-image')

    this.panzoom = Panzoom(this.elem, { maxScale: 6, minScale: 1, canvas: true })

    this.elem.parentElement.addEventListener('wheel', (zoom) => {
      const deltaY = zoom.deltaY;

      deltaY > 0 ? this.panzoom.zoomOut(0.01 * deltaY) : this.panzoom.zoomIn(0.01 * deltaY)
    });
  }

  navigateToAdjacentCoin(coin, direction) {
    event.preventDefault();
    
    const targetCoin = direction === 'next' ? coin.next_coin : coin.prev_coin
    const series = coin.series.split(' ').join('-').toLowerCase()

    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate( [ `/coins/${coin.denomination}/${series}/${targetCoin}` ] ))
  }

  changeChartType = (chartType: string): void => {
    this.chartService.chart.options.data[0].type = chartType;
    this.chartService.renderChart(this.chartData, chartType)
  }
}