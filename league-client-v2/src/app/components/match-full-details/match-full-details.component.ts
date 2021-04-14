import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { StoreService } from 'src/app/services/store.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
}


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

  loaded = false
  myPartId = 0

  myItems: any = []
  playedChampion: any
  myStats: any = {}

  teamOne: any = {}
  teamTwo: any = {}

  constructor(
    private req: RequestService, 
    private store: StoreService, 
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.teamOne.players = []
    this.teamOne.champions = []
    this.teamTwo.champions = []
    this.teamTwo.players = []


    this.req.getMatchDetails(this.match.gameId).then(res2 => {
      
      this.gameData = res2
      console.log(this.gameData);
      const currentUserAccountId = this.req.accountId
      
      for(let participant of this.gameData.participantIdentities) {
        if(participant.participantId <= 5) {
          this.teamOne.players.push(participant.player.summonerName)
        } else {
          this.teamTwo.players.push(participant.player.summonerName)
        }
        if(participant.player.accountId === currentUserAccountId) {
          this.myPartId = participant.participantId
          this.store.updateCurrentUser(participant.player)
        }
      }
      this.getItemsData()
    })
  }

  getItemsData(): void {
    const myStats = this.gameData.participants[this.myPartId - 1].stats
    this.myStats = myStats
    this.myStats.kda = (myStats.kills + myStats.assists) / myStats.deaths
    this.myStats.kda = this.myStats.kda.toFixed(2)
    
    const {item0, item1, item2, item3, item4, item5, item6} = myStats
    const {championId} = this.gameData.participants[this.myPartId - 1]

    const myItems = [item0, item1, item2, item3, item4, item5, item6]
    this.req.getItems().then(items => {
      const allItems: any = items

      if (allItems) {
        for (const id of myItems) {
          if (id === 0) {
            continue
          }
          this.myItems.unshift(allItems.data[id])
          this.itemData.unshift(allItems.data[id])
          this.myItems[0].image = this.itemImageUrl + allItems.data[id].image.full
          this.itemData[0].imageURL = this.myItems[0].image
        }
      }
    })

    for(let participant of this.gameData.participants) {
      if(participant.participantId <= 5) {
        this.teamOne.champions.push(this.getSpecificChampion(participant.championId))
      } else {
        this.teamTwo.champions.push(this.getSpecificChampion(participant.championId))
      }
    }
  }

  getSpecificChampion(championId: string): any {
    let test:any = {}

    this.store.allChampions$.subscribe(champions => {
      const championsArray: any = Object.entries(champions)
      for(const [key, item] of championsArray) {
        if(championId == item.key) {
          test.imageURL = `${this.championImageUrl}${item.image.full}`
          this.loaded = true          
        }
      }
    })
    return test
  }

  expandItem(): void {
    this.expand = !this.expand
  }
}
