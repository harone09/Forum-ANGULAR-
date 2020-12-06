import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: true } }
  ]
})
export class AppComponent {
  title = 'HASO';
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(public router: Router) { }

  checkSession(): boolean {
    //console.log(localStorage.getItem('Session'));

    return (localStorage.getItem('Session') != null);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
  ngOnInit() {

    console.log(this.router.url);

    console.log(window.location.href);

  }
}
