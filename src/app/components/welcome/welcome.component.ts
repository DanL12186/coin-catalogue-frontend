import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
  backendData : Object;
  backendMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("http://localhost:3002/").subscribe(response => this.handleResponse(response), error => "ohhhh sheeeeeeeitt");
    console.log("calling handleResponse()")
    //this.backendData = this.http.get("http://localhost:3002/")
  }

  handleResponse(response) {
    'dis is da response :D derp'
    console.log(response)
    this.backendData = response;
    this.backendMessage = response.what
  }

}
