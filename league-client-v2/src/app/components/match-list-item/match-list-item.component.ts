import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core'
import { RequestService } from 'src/app/services/request.service'
import { StoreService } from 'src/app/services/store.service'
import { take } from 'rxjs/operators'
@Component({
  selector: 'app-match-list-item',
  templateUrl: './match-list-item.component.html',
  styleUrls: ['./match-list-item.component.scss']
})
export class MatchListItemComponent implements OnInit {
  @Input() match: any
  itemData: any = []

  title = 'league-client-v2'
  gameData: any
  expand = false
  itemImageUrl = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/'
  championImageUrl = 'http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/'
  summonersURL = 'http://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/'

  loaded = false
  myPartId = 0

  myItems: any = []
  playedChampion: any
  myStats: any = {}
  mySummoners: any = {}

  constructor(
    private req: RequestService,
    private store: StoreService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.req.getMatchDetails(this.match.gameId).then(res2 => {
      this.gameData = res2
      const currentUserAccountId = this.req.accountId

      for (const participant of this.gameData.participantIdentities) {
        if (participant.player.accountId === currentUserAccountId) {
          this.myPartId = participant.participantId
          this.store.updateCurrentUser(participant.player)
        }
      }
      this.getItemsData()
    })
  }

  getItemsData(): void {
    const me = this.gameData.participants[this.myPartId - 1]
    const myStats = this.gameData.participants[this.myPartId - 1].stats
    this.myStats = myStats
    this.myStats.kda = (myStats.kills + myStats.assists) / myStats.deaths
    this.myStats.kda = this.myStats.kda.toFixed(2)

    const {item0, item1, item2, item3, item4, item5, item6} = myStats
    const {championId} = me

    const myItems = [item0, item1, item2, item3, item4, item5, item6]
    this.mySummoners = this.getSummoners(me.spell1Id, me.spell2Id)

    this.store.allItems$.pipe(take(1)).subscribe(allItems => {
      if (allItems) {
        for (const id of myItems) {
          if (id === 0) {
            continue
          }
          if (allItems[id]) {
            this.itemData.unshift(allItems[id])
            this.itemData[0].imageURL = this.itemImageUrl + allItems[id].image.full
          }
        }
      }
    })

    this.getSpecificChampion(championId)
  }

  getSpecificChampion(championId: string): void {
    this.ref.detectChanges()
    this.store.allChampions$.subscribe(champions => {
      const championsArray: any = Object.entries(champions)
      for (const [key, item] of championsArray) {
        if (championId == item.key) {
          this.playedChampion = item
          this.playedChampion.imageURL = `${this.championImageUrl}${item.image.full}`
          this.loaded = true
        }
      }
    })
  }

  getSummoners(summoner1Id: string, summoner2Id: string): any {
    const summonerData: any = {}
    this.store.allSummoners$.subscribe(summoners => {
      const summonersArray: any = Object.entries(summoners)
      for (const [key, item] of summonersArray) {
        if (summoner1Id.toString() === item.key) {
          summonerData.summonersURL1 = `${this.summonersURL}${item.image.full}`
        }
        if (summoner2Id.toString() === item.key) {
          summonerData.summonersURL2 = `${this.summonersURL}${item.image.full}`
        }
      }
    })
    return summonerData
  }

  expandItem(): void {
    this.expand = !this.expand
  }
}
