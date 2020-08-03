import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin } from 'src/app/models/coin';
import { Observable } from 'rxjs';
import { apiURL } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})

export class CoinDataService {
  
  constructor(private http: HttpClient) { }
  
  getCoins(params): Observable<Coin[]> {
    const [denomination, series] = this.formatGetCoinsParams(params);

    return this.http.get<Coin[]>(`${apiURL}/coins?denomination=${denomination}&series=${series}`)
  }

  getCoin = params => {
    const [ denomination, yearMintmarkAndDesignation ] = [ params['denomination'], params['year-mintmark-and-designation'] ]
    const [ year, mintmark, designation ] = this.formatGetCoinParams(yearMintmarkAndDesignation);

    return this.http.get<JSON>(
      `${apiURL}/coin?denomination=${denomination}&year=${year}&mintmark=${mintmark}&special_designation=${designation}`
    )
  }

  private formatGetCoinsParams(params) {
    const denomination = params.denomination
    let   series = '';

    if (params.series) {
      series = params.series
                     .split('-')
                     .map(str => str.replace(/[a-z]/, charMatch => charMatch.toUpperCase()))
                     .join(' ') || "";
    }

    return [denomination, series];
  }

  private formatGetCoinParams(coindDesc): string[] {
    const year        = coindDesc.slice(0, 4);
    const mintmark    = (coindDesc.match(/(?<=\d{4}-)(CC|[C-S])/gi) || "").toString()
    const designation = coindDesc.replace(year, '')
                                 .replace(/^-/,'')
                                 .replace(mintmark, '')
                                 .trim();

    return [year, mintmark, designation]
  }

  setCoins(coins) {
    return coins.map(jsonCoin => {
      const coin = Object.assign(new Coin(), jsonCoin)

      coin.survival_estimate = coin.survival_estimate['total'].split('-')[0]

      return coin
    });
  }
}