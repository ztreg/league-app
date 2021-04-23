import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @Input() userData: any
  constructor() { }

  ngOnInit(): void {
    this.userData.favoriteChampUrl = "url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_5.jpg)"
  }

}
