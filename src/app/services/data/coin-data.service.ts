import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin } from 'src/app/models/coin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinDataService {

  constructor(private http: HttpClient) { }

  getCoins(params): Observable<Coin[]> {
    const denomination = params.denomination
    const series = params?.series
                         ?.split('-')
                         ?.map(str => str.replace(/[a-z]/, char => char.toUpperCase()))
                         ?.join(' ') || "";

    return this.http.get<Coin[]>(`http://localhost:3002/coins?denomination=${denomination}&series=${series}`)
  }

  getCoin = params => {
    const [ denomination, yearMintmarkAndDesignation ] = [ params['denomination'], params['year-mintmark-and-designation'] ]
 
    const [year, mintmark, designation] = this.formatGetCoinParams(yearMintmarkAndDesignation);

    //SHOULD PROBBALY BE .get<Observable<JSON>>
    return this.http.get<JSON>(
      `http://localhost:3002/coin?denomination=${denomination}&year=${year}&mintmark=${mintmark}&special_designation=${designation}`
    )
  }

  private formatGetCoinParams(yearMintmarkAndDesignation): string[] {
    const year        = yearMintmarkAndDesignation.slice(0, 4);
    const mintmark    = (yearMintmarkAndDesignation.match(/(?<=\d{4}-)(CC|[C-S])/gi) || "").toString()
    const designation = yearMintmarkAndDesignation.replace(year, '')
                                                  .replace(/^-/,'')
                                                  .replace(mintmark, '')
                                                  .trim();

    return [year, mintmark, designation]
  }
}