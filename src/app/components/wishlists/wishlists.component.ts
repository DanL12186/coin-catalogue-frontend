import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WishlistDataService } from 'src/app/services/data/wishlist-data.service';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.scss']
})
export class WishlistsComponent implements OnInit {
  params = this.route.snapshot.params
  wishlists = [];

  constructor(
    private route: ActivatedRoute, 
    private wishlistService: WishlistDataService, 
  ) { }

  ngOnInit(): void {
    this.wishlistService
        .getUserWishlists()
        .subscribe(
          data => this.handleWishlistResponse(data),
          failure => this.handleWishlistError(failure)
        )
  }

  handleWishlistResponse(data) {
    console.log(data)
    this.wishlists = data;
  }

  handleWishlistError(failure) {
    console.log(failure);
  }

}
