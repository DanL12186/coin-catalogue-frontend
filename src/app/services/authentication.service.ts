import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '.././shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticateUser(name, password) {
    return this.http.post(`${apiURL}/login`, {user: { password: password, name: name } })
  }

  createUser(name, password) {
    return this.http.post(`${apiURL}/signup`, { user: { password: password, name: name } })
  }

  currentUser() {
    return localStorage.getItem('authenticatedUser')
  }

  logout(): void {
    localStorage.removeItem('authenticatedUser');
  }

  isLoggedIn(): boolean {
    return !!this.currentUser()
  }


}
