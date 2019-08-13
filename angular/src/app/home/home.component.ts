import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  urls: any = [];
  urlElement: any;
  url: string = '';
  shortUrl: string = '';
  urlError: string = '';
  shortUrlError: string = '';

  constructor(public api: ApiService, public localStorageService: LocalStorageService, public router: Router) { }

  ngOnInit() {
    // this.getUrls();
  }

  getUrls() {
    this.urls = [];
    // this.api.getUrls().subscribe((data: {}) => {
    //   console.log(data);
    //   this.urls = data;
    // });
    // this.api.getUrl('lol').subscribe((data: {}) => {
    //   console.log(data);
    //   this.urls = data;
    // });
    // this.api.createUrl('google.com').subscribe((data: {}) => {
    //   console.log(data);
    //   this.urls = data;
    // });

  }
  createUrl() {
    this.shortUrlError = '';
    this.urlError = '';
    if (this.url) {
      if (this.shortUrl.indexOf('/') === -1) {
        this.api.createUrl(this.url, this.shortUrl, this.localStorageService.getValue('userKey')).subscribe((data) => {
          if (data.status === 'ok') {
            this.urlElement = data.url;
            console.log(this.urlElement);
          } else {
            this.shortUrlError = data.errors.shortUrl ? data.errors.shortUrl : '';
            this.urlError = data.errors.url ? data.errors.url : '';
          }
        });
      } else {
        this.shortUrlError = 'You cant use /';
      }
    } else {
      this.urlError = 'Empty field';
    }
  }

}
