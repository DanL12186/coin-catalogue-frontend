import { Component, OnInit } from '@angular/core';
import { CoinDataService } from '../../services/data/coin-data.service';
import { Coin } from '../../models/coin';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { FormatChartDataService } from 'src/app/services/charts/format-chart-data.service';
import { RenderChartService } from 'src/app/services/charts/render-chart.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {
  coin: Coin;
  ounces: number;
  meltValue: number;

  constructor(private coinDataService: CoinDataService, 
              private route: ActivatedRoute,
              private titleService: Title,
              private chartDataFormatter: FormatChartDataService,
              private chartRenderService: RenderChartService,
             ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;

    this.coin = new Coin(0, 0, '', '', '', 0, '', null, 0, '', 0.0, 0.0, 'designer', <JSON>{});

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

    this.meltValue = this.coin.meltValue()
    this.ounces = this.coin.weightInOunces()
    
    this.displayChart(this.formatChartData())
  }

  handleError = (data: HttpErrorResponse) => {
    console.log('bohnoes D:', data);
  }

  formatChartData = () => {
    return this.chartDataFormatter.columnFormat(this.coin.pcgs_population);
  }

  displayChart = (pcgsPopulationData, chartType = 'column') => {
    return this.chartRenderService.renderChart(pcgsPopulationData, chartType)
  }

  changeChartType = (chartType: string) => {
    this.chartRenderService.chart.options.data[0].type = chartType;
    this.displayChart(this.formatChartData(), chartType);
  }

}