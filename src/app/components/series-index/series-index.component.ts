import { Component, OnInit } from '@angular/core';
import { SeriesDataService } from '../../services/data/series-data.service';
import { ActivatedRoute } from '@angular/router';
import { Coin } from '../../models/coin';

@Component({
  selector: 'app-series-index',
  templateUrl: './series-index.component.html',
  styleUrls: ['./series-index.component.scss']
})

export class SeriesIndexComponent implements OnInit {
  params = this.route.snapshot.params;
  seriesList: Object[];
  category = "";

  constructor(
    private seriesDataService: SeriesDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.seriesList = [ 
      { name: '', denomination: '', generic_img_url: '' } 
    ]

    this.seriesDataService
        .getSeries(this.params)
        .subscribe(
          data => this.handleResponse(data),
          failure => this.handleError(failure)
        )
  }

  handleResponse(data) {
    this.seriesList = data.sort((a,b) => a['date_range'].slice(0,4) - b['date_range'].slice(0,4));
    this.category = Coin.denominationToCategory(this.params['denomination']);
  }

  handleError(failure) {
    console.log(failure)
  }

}
