import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesDataService {

  constructor(private http: HttpClient) { }

  getSeries(params): Observable<JSON[]> {
    const denomination = params['denomination'];

    return this.http.get<JSON[]>(`http://localhost:3002/series?denomination=${denomination}`)
  }

}