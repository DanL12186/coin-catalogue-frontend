import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURL } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class SeriesDataService {
  url = apiURL;
  constructor(private http: HttpClient) { }

  getSeries(params): Observable<JSON[]> {
    const denomination = params['denomination'];

    return this.http.get<JSON[]>(`${this.url}/series?denomination=${denomination}`)
  }

}