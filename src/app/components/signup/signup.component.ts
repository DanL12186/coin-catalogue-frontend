import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupFailed = false;
  username =''
  password = ''

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  handleSignup = (username, password) => {
    this.authService
        .createUser(username, password)
        .subscribe(
          data => this.handleResponse(data, username),
          failure => this.handleError(failure)
        );
  }

  handleResponse(data, username) {
    this.signupFailed = data;
debugger;
    if (!this.signupFailed) {
      sessionStorage.setItem('authenticatedUser', username);

      // this.router.navigate(['welcome', this.username]);
    }
  }

  handleError(failure) {
    console.log(failure)
  }
}

