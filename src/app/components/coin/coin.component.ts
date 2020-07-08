import { Component, OnInit } from '@angular/core';
import { CoinDataService } from '../../services/data/coin-data.service';
import { Coin } from '../../models/coin';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { FormatChartDataService } from 'src/app/services/charts/format-chart-data.service';
import { RenderChartService } from 'src/app/services/charts/render-chart.service';

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

  constructor(private coinDataService: CoinDataService, 
              private route: ActivatedRoute,
              private titleService: Title,
              private chartDataFormatService: FormatChartDataService,
              private chartRenderService: RenderChartService,
              private metalsPriceService: GoldAndSilverPricesService
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
    this.chartRenderService.renderChart(this.formatChartData())
    this.enableZoom()
  }

  handlePriceResponse(data : JSON) {
    this.metalPrices = data
    localStorage.setItem('goldAndSilverPrices', JSON.stringify(data))
  }

  handleError = (data : HttpErrorResponse) => {
    console.log('bohnoes D:', data);
  }

  setComponentProperties() {
    this.meltValue = this.coin.meltValue(this.metalPrices)
    this.ounces = this.coin.weightInOunces()
    this.coinDescription = this.coin.description()
  }

  formatChartData = () : JSON[] => {
    return this.chartDataFormatService.format(this.coin.pcgs_population);
  }

  changeChartType = (chartType: string) => {
    this.chartRenderService.chart.options.data[0].type = chartType;
    this.chartRenderService.renderChart(this.formatChartData(), chartType)
  }

  enableZoom = () => {
    this.elem = document.getElementById('panzoom-image')

    this.panzoom = Panzoom(this.elem, { maxScale: 5, canvas: true })

    this.elem.parentElement.addEventListener('wheel', (zoom) => {
      const deltaY = zoom.deltaY;

      deltaY > 0 ? this.panzoom.zoomOut(0.01 * deltaY) : this.panzoom.zoomIn(0.01 * deltaY)
    });
  }

}