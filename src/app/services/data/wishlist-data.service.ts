import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURL } from '../../shared/constants';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistDataService {
  url = apiURL;
  
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getUserWishlists(): Observable<JSON[]> {
    const user = this.authService.currentUser()

    return this.http.get<JSON[]>(`${this.url}/wishlists?user_name=${user}`)
  }

}