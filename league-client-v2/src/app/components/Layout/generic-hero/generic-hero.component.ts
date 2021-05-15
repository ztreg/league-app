import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'cypress/types/bluebird';
import { map } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-generic-hero',
  templateUrl: './generic-hero.component.html',
  styleUrls: ['./generic-hero.component.scss']
})
export class GenericHeroComponent implements OnInit {

  constructor(private router: Router, private store: StoreService, private activatedRoute: ActivatedRoute) { }
  currentUser$ = this.store.currentUser$
  isProfile = false
  ngOnInit(): void {
    // console.log(window.location.pathname.split("/")[1]);
    this.router.events.subscribe((route:any) => {
      if(route instanceof NavigationEnd) {
        const cutPath = window.location.pathname.split("/")[1]
        console.log(route.url);
        
        route.url === '/profile' || cutPath === 'users' ? this.isProfile = true : this.isProfile = false
      }
    });
  }

}
