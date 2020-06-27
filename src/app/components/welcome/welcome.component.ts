import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
  backendData : Object;
  backendMessage = '';

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Coin Catalogue');
  }

}
