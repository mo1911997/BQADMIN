import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from './animations/FadeAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {

  title = 'ayeshani-admin-panel';
  constructor(private router:Router)
  {

  }
  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
  ngOnInit(): void {
    this.router.navigate(['/sidenav']);
  }


}
