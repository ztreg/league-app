import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { lowerFirst } from 'cypress/types/lodash'
import { first, map, take, tap } from 'rxjs/operators'
import { StoreService } from 'src/app/services/store.service'
import { GameMetaData } from 'src/app/types/Match'

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {
  @Input() teamInfo: any
  @Input() gameMetaData: GameMetaData | undefined
  @Input() matchOverview: any

  sortedTeam: any = {}
  sorted = false
  currentUser = ''
  championURL = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/'
  championImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/'
  bannedChampions1: any = []
  bannedChampions2: any = []
  loaded = false

  constructor(private router: Router, private store: StoreService) { }
  champions$ = this.store.allChampions$.pipe(
    map(data => {
      const hejhej = Object.values(data).map((item: any) => [item.key, item])
      const awsomeDict = Object.fromEntries(hejhej)
      return awsomeDict
    })
  )

  ngOnInit(): void {
    if (this.teamInfo) {
      this.loopTeamBans()
      this.store.currentUser$.pipe(take(1)).subscribe(res => {
        this.currentUser = res.accountId
      })
      this.sorted = true
    }
  }

  redirect(id: string): void {
    this.router.navigate(['/users', id])
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
    const specificChamp: any = {}

    this.store.allChampions$.subscribe(champions => {
      const championsArray: any = Object.entries(champions)
      for (const [key, item] of championsArray) {
        if (championId.toString() === item.key) {
          specificChamp.imageURL = `${this.championImageUrl}${item.image.full}`
          this.loaded = true
        }
      }
    })
    return specificChamp
  }
}
