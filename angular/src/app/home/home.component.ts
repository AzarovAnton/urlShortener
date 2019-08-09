import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  urls: any = [];

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getUrls();
  }

  getUrls() {
    this.urls = [];
    this.api.getUrls().subscribe((data: {}) => {
      console.log(data);
      this.urls = data;
    });
    this.api.getUrl('lol').subscribe((data: {}) => {
      console.log(data);
      this.urls = data;
    });
    this.api.createUrl('google.com').subscribe((data: {}) => {
      console.log(data);
      this.urls = data;
    });

  }

}
