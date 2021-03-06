import { Component, Input, OnInit } from '@angular/core'
import { map, take } from 'rxjs/operators'
import { GeneralUtilsService } from 'src/app/services/general-utils.service'
import { RequestService } from 'src/app/services/request.service'
import { StoreService } from 'src/app/services/store.service'
import { Player } from 'src/app/types/Player'

@Component({
  selector: 'app-match-list-nonmeta-item',
  templateUrl: './match-list-nonmeta-item.component.html',
  styleUrls: ['./match-list-nonmeta-item.component.scss']
})
/**
 * This Component is used when we have access to the matches in the store
 */
export class MatchListNonmetaItemComponent implements OnInit {

  @Input() match: any
  itemData: any = []

  title = 'match-details'
  gameData: any
  expand = false
  itemImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/'
  championImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/'
  summonersURL = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/spell/'

  currentUserAccountId!: string
  loaded = false
  myPartId = 0

  player: Player | undefined

  champions$ = this.store.allChampions$.pipe(
    map(data => {
      const allChampions = Object.values(data).map((item: any) => [item.key, item])
      const changedFormatChampions = Object.fromEntries(allChampions)
      return changedFormatChampions
    })
  )

  constructor(
    private req: RequestService,
    private store: StoreService,
    private generalUtils: GeneralUtilsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.gameData = this.match
    this.store.currentUser$.pipe(take(1)).subscribe(res2 => {
      this.currentUserAccountId = res2.accountId
    })

    for (const participant of this.gameData.participantIdentities) {
      if (participant.player.accountId ===  this.currentUserAccountId) {
        this.myPartId = participant.participantId
      }
    }
    this.getMatchData()
  }

  getMatchData(): void {
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
    const { summonersURL1, summonersURL2 } = this.generalUtils.getSummoners(participantINFO.spell1Id, participantINFO.spell2Id)
    const kdaclear = (participantINFO.stats.kills + participantINFO.stats.assists) /
    (participantINFO.stats.deaths > 0 ? participantINFO.stats.deaths : 1)
    const kda = kdaclear.toFixed(2)
    const isRanked = this.gameData.teams[0].bans.length === 0 ? false : true
    const playerToAdd: Player = {
      name: participantIdentity.player.summonerName,
      accountId: participantIdentity.player.accountId,
      stats: participantINFO.stats,
      items,
      win,
      kda,
      timeAgo: this.match.timestamp,
      timeline: { lane, role, championID: participantINFO.championId, isRanked },
      summoners: { summonersURL1, summonersURL2 }
    }
    this.player = playerToAdd
    this.loaded = true
  }

}
