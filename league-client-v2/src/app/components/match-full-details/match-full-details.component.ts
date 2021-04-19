import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'
import { RequestService } from 'src/app/services/request.service'
import { StoreService } from 'src/app/services/store.service'
import { Item, Player } from 'src/app/types/Player'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-match-full-details',
  templateUrl: './match-full-details.component.html',
  styleUrls: ['./match-full-details.component.scss']
})

export class MatchFullDetailsComponent implements OnInit {
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
  myStats: any

  teamOne: any = []
  teamTwo: any = []

  constructor(
    private req: RequestService,
    private store: StoreService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.teamOne.Players = []
    this.teamTwo.Players = []
    this.req.getMatchDetails(this.match.gameId).then(res2 => {
      this.gameData = res2

      this.getTeamData()
    })
  }

  getTeamData(): void {
    const currentUserAccountId = this.req.accountId

    for (let i = 0; i < this.gameData.participantIdentities.length; i++) {
      const participantIdentity = this.gameData.participantIdentities[i]
      const participantINFO = this.gameData.participants[i]
      const {role, lane} = participantINFO.timeline
      const {item0, item1, item2, item3, item4, item5, item6} = participantINFO.stats
      const playerItems = [item0, item1, item2, item3, item4, item5, item6]
      const items = this.getItems(playerItems)

      if (participantIdentity.player.accountId === currentUserAccountId) {
        this.myPartId = participantIdentity.participantId
        this.store.updateCurrentUser(participantIdentity.player)
      }

      const { imageURL } = this.getSpecificChampion(participantINFO.championId)
      const { summonersURL1, summonersURL2 } = this.getSummoners(participantINFO.spell1Id, participantINFO.spell2Id)

      const player: Player = {
        name: participantIdentity.player.summonerName,
        championURL: imageURL,
        stats: participantINFO.stats,
        items,
        timeline: { lane, role },
        summoners: { summonersURL1, summonersURL2 }
      }
      if (participantIdentity.participantId <= 5) {
        this.teamOne.Players.push(player)
      } else {
        this.teamTwo.Players.push(player)
      }
    }

  }

  getItems(itemsArray: any []): Item[] {

    const itemsURL: Item[] = []
    this.store.allItems$.pipe(take(1)).subscribe(allItems => {
      if (allItems) {
        for (const id of itemsArray) {
          if (id === 0) {
            continue
          }
          const itemURL = allItems[id]
          itemsURL.unshift(itemURL)
          itemsURL[0].itemURL = this.itemImageUrl + allItems[id].image.full
        }
      }
    })
    return itemsURL
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

  getSummoners(summoner1Id: string, summoner2Id: string): any {
    const summonerData: any = {}
    this.store.allSummoners$.subscribe(summoners => {
      const summonersArray: any = Object.entries(summoners)
      for (const [key, item] of summonersArray) {
        if (summoner1Id.toString() === item.key) {
          summonerData.summonersURL1 = `${this.summonersURL}${item.image.full}`
          this.loaded = true
        }
        if (summoner2Id.toString() === item.key) {
          summonerData.summonersURL2 = `${this.summonersURL}${item.image.full}`
          this.loaded = true
        }
      }
    })
    return summonerData
  }

  expandItem(): void {
    this.expand = !this.expand
  }
}
