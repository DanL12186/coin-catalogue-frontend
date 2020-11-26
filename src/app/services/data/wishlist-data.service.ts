import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURL } from '../../shared/constants';
import { AuthenticationService } from '../authentication.service';
import { Coin } from 'src/app/models/coin';

@Injectable({
  providedIn: 'root'
})
export class WishlistDataService {
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getUserWishlists(): Observable<JSON[]> {
    const user = this.authService.currentUser()

    return this.http.get<JSON[]>(`${apiURL}/wishlists?user_name=${user}`)
  }

  getUserWishlist(wishlistId): Observable<Coin[]> {
    return this.http.get<Coin[]>(`${apiURL}/wishlists/${wishlistId}`)
  }

  addCoinToWishlist(wishlistId, coin): void {
    this.http.post(`${apiURL}/wishlists/${wishlistId}/add_coin`, { coin: { id: coin.id } }).subscribe()
  }

}