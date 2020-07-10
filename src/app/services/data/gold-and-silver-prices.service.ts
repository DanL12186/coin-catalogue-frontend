import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL } from '../../shared/location';

@Injectable({
  providedIn: 'root'
})
export class GoldAndSilverPricesService {
  apiURL = apiURL;
  constructor(private http: HttpClient) { 
  }

  //refactor this later into one method instead of fromLocalStorage and getGoldAndSilverPrices()
  fromLocalStorage() {
    const priceObject = JSON.parse(localStorage.goldAndSilverPrices);

    if (priceObject) {
      const last_update = priceObject.updated_at

      if (new Date().getTime() - new Date(last_update).getTime() > 86400000) {
        this.http.get<JSON>('${APIURL}/update_prices/');
        return null;
      } else {
        return priceObject;
      }
    }
    
  }

  getGoldSilverPrices() {
    return this.http.get<JSON>(`${this.apiURL}/prices/`);
  }


}
