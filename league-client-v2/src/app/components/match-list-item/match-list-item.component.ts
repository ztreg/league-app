import { Component, Input, OnInit } from '@angular/core'
import { RequestService } from 'src/app/services/request.service'
import { StoreService } from 'src/app/services/store.service'
import { take } from 'rxjs/operators'
import { GeneralUtilsService } from 'src/app/services/general-utils.service'
import { Player } from 'src/app/types/Player'
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

  currentUserAccountId!: string
  loaded = false
  myPartId = 0

  player: Player | undefined

  constructor(
    private req: RequestService,
    private store: StoreService,
    private generalUtils: GeneralUtilsService
  ) {}

  ngOnInit(): void {
    console.log('printing match')
    this.req.getMatchDetails(this.match.gameId).then(res2 => {

      this.gameData = res2
      this.store.currentUser$.subscribe(res => {
        this.currentUserAccountId = res.accountId
      })

      for (const participant of this.gameData.participantIdentities) {
        if (participant.player.accountId ===  this.currentUserAccountId) {
          this.myPartId = participant.participantId
          // this.store.updateCurrentUser(participant.player)
        }
      }


      this.getItemsData()
    })
  }

  getItemsData(): void {
    let me = this.myPartId

    me = (me - 1)
    if (me === -1) {
      me++
    }
    const participantIdentity = this.gameData.participantIdentities[me]
    const participantINFO = this.gameData.participants[me]
    const {role, lane} = participantINFO.timeline

    const {item0, item1, item2, item3, item4, item5, item6, win} = participantINFO.stats
    const playerItems = [item0, item1, item2, item3, item4, item5, item6]
    const items = this.generalUtils.getItems(playerItems)

    const { imageURL } = this.generalUtils.getSpecificChampion(participantINFO.championId)

    const { summonersURL1, summonersURL2 } = this.generalUtils.getSummoners(participantINFO.spell1Id, participantINFO.spell2Id)
    const kdaclear = (participantINFO.stats.kills + participantINFO.stats.assists) / participantINFO.stats.deaths
    const kda = kdaclear.toFixed(2)

    const playerToAdd: Player = {
      name: participantIdentity.player.summonerName,
      accountId: participantIdentity.player.accountId,
      championURL: imageURL,
      stats: participantINFO.stats,
      items,
      win,
      kda,
      timeline: { lane, role },
      summoners: { summonersURL1, summonersURL2 }
    }
    this.player = playerToAdd
    this.loaded = true
  }

  expandItem(): void {
    this.expand = !this.expand
  }
}
