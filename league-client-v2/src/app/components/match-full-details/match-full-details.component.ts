import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'
import { RequestService } from 'src/app/services/request.service'
import { StoreService } from 'src/app/services/store.service'
import { Item, Player } from 'src/app/types/Player'
import { take } from 'rxjs/operators'
import { GeneralUtilsService } from 'src/app/services/general-utils.service'

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

  currentUserAccountId!: string

  constructor(
    private req: RequestService,
    private gereralUtils: GeneralUtilsService
  ) {}

  ngOnInit(): void {
    this.teamOne = []
    this.teamTwo = []
    this.teamOne.Players = []
    this.teamTwo.Players = []

    // If the match isnt in from store, get it from API
    if (!this.match) {
      this.req.getMatchDetails(this.match.gameId).then(res2 => {
        this.gameData = res2
        console.log('isnt in store')

      })
    } else {
      console.log('is in store')
      this.gameData = this.match
    }

    this.getTeamData()

  }

  /**
   * Gets the needed data for a specific match, includes the items, summoners, players, stats
   */
  getTeamData(): void {
    const teamOnePlayers: any = []
    const teamTwoPlayers: any = []

    for (let i = 0; i < this.gameData.participantIdentities.length; i++) {
      const participantIdentity = this.gameData.participantIdentities[i]
      const participantINFO = this.gameData.participants[i]

      const {role, lane} = this.gameData.participants[i].timeline

      const {item0, item1, item2, item3, item4, item5, item6} = participantINFO.stats
      const playerItems = [item0, item1, item2, item3, item4, item5, item6]
      const items = this.gereralUtils.getItems(playerItems)

      const { imageURL } = this.gereralUtils.getSpecificChampion(participantINFO.championId)
      const { summonersURL1, summonersURL2 } = this.gereralUtils.getSummoners(participantINFO.spell1Id, participantINFO.spell2Id)

      const playerToAdd: Player = {
        name: participantIdentity.player.summonerName,
        accountId: participantIdentity.player.accountId,
        championURL: imageURL,
        stats: participantINFO.stats,
        items,
        timeline: { lane, role },
        summoners: { summonersURL1, summonersURL2 }
      }
      console.log(playerToAdd)


      if (participantIdentity.participantId <= 5) {
        teamOnePlayers.push(playerToAdd)
      } else if (participantIdentity.participantId > 5) {
        teamTwoPlayers.push(playerToAdd)
      }
    }
    if (teamOnePlayers.length === 5) {
      this.teamOne.Players = teamOnePlayers
    }
    if (teamTwoPlayers.length === 5) {
      this.teamTwo.Players = teamTwoPlayers
    }
    this.loaded = true

  }
  expandItem(): void {
    this.expand = !this.expand
  }
}
