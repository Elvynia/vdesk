import { Component } from '@angular/core';

@Component({
  selector: 'ramm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  width: string;
  height: string;

  constructor() {
    this.width = (window.innerWidth - 10) + "px";
    this.height = (window.innerHeight - 10) + "px";
  }
}
