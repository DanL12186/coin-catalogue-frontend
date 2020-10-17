import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username     = '';
  password     = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor(private router: Router, private authService: AuthenticationService) { 

  }

  handleLogin = (username, password) => {
    this.authService
        .authenticateUser(username, password)
        .subscribe(
          data => this.handleResponse(data, username),
          failure => this.handleError(failure)
        );
  }

  handleResponse(data, username) {
    const user = data;

    if (!this.invalidLogin) {
      localStorage.setItem('authenticatedUser', username);

      this.router.navigate(['/']);
    }
  }

  handleError(failure) {
    this.invalidLogin = true;
    console.log(failure)
  }
  

  ngOnInit(): void {
  }

}
