import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToolbarComponent } from '../app/components/shared/toolbar/toolbar.component';

// import { enableProdMode } from '@angular/core';
// enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title: any;
  public constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Coin Catalogue');
  }
}