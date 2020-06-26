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
    const [ denomination, yearAndMintmark ] = [ params['denomination'], params['year-and-mintmark'] ]
 
    return this.http.get<Coin>(`http://localhost:3002/coin?denomination=${denomination}&year_and_mintmark=${yearAndMintmark}`)
  }
}