import { Component, Input, OnInit } from '@angular/core'
import { RequestService } from 'src/app/services/request.service'
import { StoreService } from 'src/app/services/store.service'
import { first, map, take, tap } from 'rxjs/operators'
import { GeneralUtilsService } from 'src/app/services/general-utils.service'
import { Player } from 'src/app/types/Player'
import { _MatTabGroupBase } from '@angular/material/tabs'
import { getLocaleWeekEndRange } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-match-list-item',
  templateUrl: './match-list-item.component.html',
  styleUrls: ['./match-list-item.component.scss']
})
/**
 * This Component is used when we dont have access to the matches in the store
 */
export class MatchListItemComponent implements OnInit {
  @Input() match: any
  itemData: any = []

  title = 'league-client-v2'
  gameData: any
  expand = false
  itemImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/'
  championImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/'
  summonersURL = 'https://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/'

  currentUserAccountId!: string
  loaded = false
  myPartId = 0

  player: Player | undefined

  champions$ = this.store.allChampions$.pipe(
    map(data => {
      const changedChampions = Object.values(data).map((item: any) => [item.key, item])
      return Object.fromEntries(changedChampions)
    })
  )


  constructor(
    private req: RequestService,
    private store: StoreService,
    private generalUtils: GeneralUtilsService,
    private router: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getMatchDetails()
  }

  async getMatchDetails(): Promise<void> {
    try {
      const res = await this.req.getMatchDetails(this.match.gameId)
      this.gameData = res
      const userId = this.router.snapshot.paramMap.get('id')


      if (!userId) {
        this.store.currentUser$.subscribe(res2 => {
          this.currentUserAccountId = res2.accountId
        })
        const oldList: any = this.store.getCurrentUserLatestMatches()

        let newList = []
        this.gameData.timestamp = this.match.timestamp
        newList = oldList
        newList.push(this.gameData)
        this.store.updateCurrentUserLatestMatches(newList)
        for (const participant of this.gameData.participantIdentities) {
            if (participant.player.accountId ===  this.currentUserAccountId) {
              this.myPartId = participant.participantId
            }
          }

      } else {
        this.currentUserAccountId = userId
        for (const participant of this.gameData.participantIdentities) {
          if (participant.player.accountId === userId) {
            this.myPartId = participant.participantId
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
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

    // const { imageURL } = this.generalUtils.getSpecificChampion(participantINFO.championId)

    const { summonersURL1, summonersURL2 } = this.generalUtils.getSummoners(participantINFO.spell1Id, participantINFO.spell2Id)
    const isRanked = this.gameData.teams[0].bans.length === 0 ? false : true

    const kdaclear = (participantINFO.stats.kills + participantINFO.stats.assists) /
    (participantINFO.stats.deaths > 0 ? participantINFO.stats.deaths : 1)

    const kda = kdaclear.toFixed(2)

    const playerToAdd: Player = {
      name: participantIdentity.player.summonerName,
      accountId: participantIdentity.player.accountId,
      stats: participantINFO.stats,
      items,
      win,
      kda,
      timeAgo: this.match.timestamp,
      timeline: { lane, role, championID: participantINFO.championId, gameType: this.gameData.gameMode, isRanked },
      summoners: { summonersURL1, summonersURL2 }
    }
    this.player = playerToAdd
    this.loaded = true
  }

expandItem(): void {
    this.expand = !this.expand
  }
}
