import { Component } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public localStorageService: LocalStorageService) {}
  title = 'angular';
  ngOnInit(): void
  {
    const ne = 'userKey';
    // this.localStorageService.setValue(ne, ne);
    console.log(this.localStorageService.getValue(ne));
  }
}
