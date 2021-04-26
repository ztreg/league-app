import { Component, Input, OnInit } from '@angular/core';
import { RequestUtilities } from 'src/app/services/requestUtils';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @Input() userData: any
  constructor(private store: StoreService, private utils: RequestUtilities) { }

  ngOnInit(): void {
    this.userData.favoriteChampUrl = "url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_5.jpg)"
  }

  followUser(accountId: string): void {
    this.store.currentUser$.subscribe(res => {
      // console.log(res.);
      
      console.log(accountId);
      this.utils.followUser(accountId, res.userDetails.id)
    })
  }

}
