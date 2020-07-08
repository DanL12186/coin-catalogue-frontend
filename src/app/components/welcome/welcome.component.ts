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
  images: any[];
  scale = 1;

  zoom = (): void => {
    event.preventDefault();

    this.scale += event['deltaY'] * -0.01;

    //Constrain scale dimensions
    this.scale = Math.min(Math.max(1, this.scale), event.srcElement['naturalHeight'] / event.srcElement['height']);

    event.srcElement['style'].transform = `scale(${this.scale})`;
  }

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Coin Catalogue');
    
    this.images = <any> document.querySelectorAll('.coin-img')

    this.images.forEach(image => {
      image.addEventListener('wheel', () => {
        this.zoom();
      })
    })

    // this.panzoom = Panzoom(this.elem, { maxScale: 5, canvas: true })
    // this.elem.addEventListener('click', this.panzoom.zoomWithWheel); //zoomy()
    // this.elem.parentElement.addEventListener('wheel', this.panzoom.zoomIn);
  }

}