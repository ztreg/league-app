import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core'
import { RequestService } from 'src/app/services/request.service'
import { StoreService } from 'src/app/services/store.service'
import { Item, Player} from 'src/app/types/Player'
import { first, single, take, tap } from 'rxjs/operators'
import { GeneralUtilsService } from 'src/app/services/general-utils.service'
import { GameMetaData } from 'src/app/types/Match'
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
  itemImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/'
  championImageUrl = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/'
  summonersURL = 'https://ddragon.leagueoflegends.com/cdn/11.9.1/img/spell/'

  loaded = false
  myPartId = 0

  myItems: any = []
  playedChampion: any
  myStats: any

  teamOne: any = []
  teamTwo: any = []
  gameMetaData: GameMetaData | undefined
  currentUserAccountId!: string
  matchOverview: any

  constructor(
    private req: RequestService,
    private generalUtils: GeneralUtilsService,
    private store: StoreService
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

      })
    } else {
      this.gameData = this.match

    }
    const {teams, gameDuration, gameVersion} = this.gameData
    this.matchOverview = { teams, gameDuration, gameVersion }
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

      const items = this.generalUtils.getItems(playerItems)
      participantINFO.stats.name = participantIdentity.player.summonerName
      const { summonersURL1, summonersURL2 } = this.generalUtils.getSummoners(participantINFO.spell1Id, participantINFO.spell2Id)

      const playerToAdd: Player = {
        name: participantIdentity.player.summonerName,
        accountId: participantIdentity.player.accountId,
        stats: participantINFO.stats,
        items,
        timeline: { lane, role, championID: participantINFO.championId },
        summoners: { summonersURL1, summonersURL2 },
      }

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
    this.gameMetaData = {
      blueside: this.gameData.teams[0],
      redside: this.gameData.teams[1]
    }
    this.loaded = true

  }
  expandItem(): void {
    this.expand = !this.expand
  }

}
