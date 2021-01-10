import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coin } from 'src/app/models/coin';
import { WishlistDataService } from 'src/app/services/data/wishlist-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistCoins: Coin[];

  constructor(private wishlistService: WishlistDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.wishlistService
        .getUserWishlist(this.route.snapshot.params.id)
        .subscribe(
          data => this.handleWishlistResponse(data),
          failure => this.handleWishlistError(failure)
        )
    
  }

  handleWishlistResponse(data) {
    this.wishlistCoins = data.map(jsonCoin => Object.assign(new Coin(), jsonCoin))
  }

  handleWishlistError(failure) {
    console.log(failure)
  }

}
