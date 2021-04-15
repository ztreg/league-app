import { Component, Input, OnInit } from '@angular/core'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-match-full-details-header',
  templateUrl: './match-full-details-header.component.html',
  styleUrls: ['./match-full-details-header.component.scss']
})
export class MatchFullDetailsHeaderComponent implements OnInit {
  @Input() matchOverview: any

  constructor(private store: StoreService) { }

  championImageUrl = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/'
  bannedChampions1: any = []
  bannedChampions2: any = []
  loaded = false

  ngOnInit(): void {
    this.matchOverview.gameDuration = (this.matchOverview.gameDuration / 60).toFixed(2)
    this.loopTeamBans()
  }

  loopTeamBans(): void {
    for (const ban1 of this.matchOverview.teams[0].bans) {
      this.bannedChampions1.unshift(this.getSpecificChampion(ban1.championId))
    }
    for (const ban2 of this.matchOverview.teams[1].bans) {
      this.bannedChampions2.unshift(this.getSpecificChampion(ban2.championId))
    }
  }

  getSpecificChampion(championId: string): any {
    const test: any = {}

    this.store.allChampions$.subscribe(champions => {
      const championsArray: any = Object.entries(champions)
      for (const [key, item] of championsArray) {
        if (championId.toString() === item.key) {
          test.imageURL = `${this.championImageUrl}${item.image.full}`
          this.loaded = true
        }
      }
    })
    return test
  }

}
